/***
 * Engine may be dutied to control <dragger> <focus> <moving> <...> 
 * It's used to be a middleware to communicate with other components and offer to blocks and container
 * such as <Canvas></Canvas> <Configuration></Configuration>
 * Will EngineStore may control property which saved in the store rather than other hooks to edit property which is defined in the Store
 * seperate useBlcokMoving and useBlocks 
 * 
 * The next key point is that we should do somethings for `Property`, `Events`, `Data` and synchronous block to blocks
 * **/

import { observer, useLocalObservable } from 'mobx-react-lite';
import React, { createContext, useEffect } from 'react';
import { useDragMenus } from '../hooks/useDragMenus';
import { useFocus } from '../hooks/useFocus';
import { useBlocksSync, type actions } from '../hooks/useBlocksSync';
import { type EditorProps } from '../components/editor';
import { useContainer } from '../hooks/useContainer';



export interface BlockProps {
    type: string,
    id: string,
    style: React.CSSProperties,
    action?: any,
    data?: any,
    focus?: boolean,
    schema?: any,
    animation?: any,
    events?: any,
    property?: any
}
export interface BlockItemProps {
    data?: any,
    events?: any,
    property?: any,
    id: string,
}

interface Focus {
    focusInfo: Map<string, BlockProps>,
    getFocus: (e: React.MouseEvent<HTMLDivElement>, block: BlockProps) => void,
    clearFocus: () => void,
    handleFocusMap: (block: BlockProps, isMultiple?: boolean) => void,
}
interface Drag {
    onDragStart: (e: DragEvent, comp: any) => void
    onDragEnd: () => void
    block: BlockProps | null
}
export interface Engine {
    focus: Focus,
    dragger: Drag,
    setFocusInfo: (focusInfo: Map<string, BlockProps>) => void
    setDraggerBlock: (block: BlockProps) => void,
    setBlocks: (blocks: BlockProps[]) => void,
    data?: 'static' | 'dynamic',
    events?: any,
    container: {
        container: any,
        onContainerEdit: (params: string, value: any) => void,
    },
    blocks: {
        blocks: BlockProps[],
        asyncBlocks: (action: actions, block: BlockProps | BlockProps[]) => void
    },

}

interface EngineCanvas {
    canvasRef: React.MutableRefObject<any>,
    children: React.ReactNode,
    data: {
        container: any,
        blocks: BlockProps[]
    }
}
export const EngineContext = createContext<Engine>({
    focus: {
        focusInfo: new Map(),
        getFocus: (e: React.MouseEvent<HTMLDivElement>, block: BlockProps) => { },
        clearFocus: () => { },
        handleFocusMap: (block: BlockProps, isMultiple?: boolean) => { }
    },
    dragger: {
        onDragStart: () => { },
        onDragEnd: () => { },
        block: null
    },
    setFocusInfo: () => { },
    setDraggerBlock: () => { },
    setBlocks: (blocks:  BlockProps[]) => {},
    container: {
        container: null,
        onContainerEdit: (params: string, value: any) => { },
    },
    blocks: {
        blocks: [],
        asyncBlocks: (action: actions, block: BlockProps | BlockProps[]) => { }
    }
})


const EngineProvider = (props: EngineCanvas) => {
    const [dragStart, dragEnd, block] = useDragMenus(props.canvasRef)
    const [getFocus, clearFocus, focusInfo, handleFocusMap] = useFocus()
    const [container, onContainerEdit] = useContainer(props.data.container)
    const [blocks, asyncBlocks] = useBlocksSync(props.data.blocks)
    useEffect(() => {
        EngineStore.setFocusInfo(focusInfo)
    }, [focusInfo])
    useEffect(() => {
     
        if (block && JSON.stringify(block) !== '{}') {
            asyncBlocks('add', block)
            EngineStore.setDraggerBlock(block)
        }
    }, [block])
    useEffect(() => {
    
        EngineStore.setBlocks(blocks)
    }, [blocks])
    // useEffect(() => {
    //     EngineStore.setDraggerBlock(block?.proper)
    // },[block])
    const EngineStore = useLocalObservable((): Engine => {
        return {
            focus: {
                getFocus,
                clearFocus,
                focusInfo,
                handleFocusMap
            },
            dragger: {
                onDragStart: dragStart,
                onDragEnd: dragEnd,
                block,
            },
            container: {
                container,
                onContainerEdit
            },
            blocks: {
                blocks,
                asyncBlocks,
            },
            setFocusInfo: (focusInfo: Map<string, BlockProps>) => {
                EngineStore.focus.focusInfo = focusInfo
            },
            setDraggerBlock: (block: BlockProps) => {
                EngineStore.dragger.block = block
            },
            setBlocks: (blocks: BlockProps[]) => {
                EngineStore.blocks.blocks = blocks
            },
        }
    })
    // console.log(EngineStore.dragger.)
    return (
        <EngineContext.Provider value={EngineStore}>
            {props.children}
        </EngineContext.Provider>
    )
}

export default observer(EngineProvider)