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
import React, { createContext, useEffect, useState } from 'react';
import { useDragMenus } from '../hooks/useDragMenus';
import { useFocus } from '../hooks/useFocus';
import { useBlocksSync, type path } from '../hooks/useBlocksSync';
import { type EditorProps } from '../components/editor';
import { useContainer } from '../hooks/useContainer';
import { useBlockMoving } from '../hooks/useBlockMoving';


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
    getFocus: (e: React.MouseEvent<HTMLDivElement>, block: BlockProps,scale:number) => void,
    clearFocus: () => void,
    handleFocusMap: (block: BlockProps, isMultiple?: boolean) => void,
    mouseStartMoving:{
        startX:number,
        startY:number,
        scale:number
    } 
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
        asyncBlocks: (action: string, block: BlockProps | BlockProps[],obj?:any) => void
    },
    moving: {
        handleMoving: (event: React.MouseEvent<HTMLDivElement>, scale: number) => void,
    },
    property:{
        setProperty:(values:{[key:string]:any},focus:Map<string, BlockProps>) => void 
    }
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
        getFocus: (e: React.MouseEvent<HTMLDivElement>, block: BlockProps,scale:number) => { },
        clearFocus: () => { },
        handleFocusMap: (block: BlockProps, isMultiple?: boolean) => { },
        mouseStartMoving:{
            startX:0,
            startY:0,
            scale:0,
        }
    },
    dragger: {
        onDragStart: () => { },
        onDragEnd: () => { },
        block: null
    },
    setFocusInfo: () => { },
    setDraggerBlock: () => { },
    setBlocks: (blocks: BlockProps[]) => { },
    container: {
        container: null,
        onContainerEdit: (params: string, value: any) => { },
    },
    blocks: {
        blocks: [],
        asyncBlocks: (action: string, block: BlockProps | BlockProps[]) => { }
    },
    moving: {
        handleMoving: (event: React.MouseEvent<HTMLDivElement>, scale: number) => { },
    },
    property:{
        setProperty:(values:{[key:string]:any},focus:Map<string, BlockProps>) => {} 
    }
})


const EngineProvider = (props: EngineCanvas) => {
    // 拖拽相关
    const [dragStart, dragEnd, block] = useDragMenus(props.canvasRef)
    // block 移动，焦点相关
    const [getFocus, clearFocus, focusInfo, handleFocusMap,mouseStartMoving] = useFocus()
    const [handlePrevMove,handleMove] = useBlockMoving()
    // 父容器相关(画布)
    const [container, onContainerEdit] = useContainer(props.data.container)
    // blocks 相关
    const [blocks, asyncBlocks] = useBlocksSync(props.data.blocks)
    useEffect(() => {
        EngineStore.setFocusInfo(focusInfo)
        EngineStore.focus.mouseStartMoving = mouseStartMoving
    }, [focusInfo,mouseStartMoving])
    useEffect(() => {
        if (block && JSON.stringify(block) !== '{}') {
            asyncBlocks('add', block)
            handleFocusMap(block)
            EngineStore.setDraggerBlock(block)
        }
    }, [block])
    useEffect(() => {
        EngineStore.setBlocks(blocks)
    }, [blocks])
    const EngineStore = useLocalObservable((): Engine => {
        return {
            focus: {
                getFocus,
                clearFocus,
                focusInfo,
                handleFocusMap,
                mouseStartMoving
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
            moving: {
                handleMoving: (event: React.MouseEvent<HTMLDivElement>, scale: number) => {
                    const size = EngineStore.focus.focusInfo.size
                    const value = EngineStore.focus.focusInfo
                    if (!size) {
                        return 
                    }
                    if (size > 0) {
                        if (size == 1) {
                            handleMove(event, value, scale, [])
                        } else {
                            handleMove(event, value, scale, EngineStore.blocks.blocks)
                        }
                    }
                },
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
            property:{
                setProperty:(values:{[key:string]:any},focus:Map<string, BlockProps>) => {
                    let focusId = focus.keys().next().value
                    const focusBlock = EngineStore.blocks.blocks.find((blcok:BlockProps) => blcok.id == focusId) as BlockProps
                    const proper = values
                    EngineStore.blocks.asyncBlocks('update.property',[focusBlock], proper)
                } 
            }
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