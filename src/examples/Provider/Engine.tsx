import { observer, useLocalObservable } from 'mobx-react-lite';
import React, { createContext, useEffect } from 'react';
import { useDragMenus } from '../hooks/useDragMenus';
import { useFocus } from '../hooks/useFocus';

/***
 * Engine may be dutied to control <dragger> <focus> <moving> <...> 
 * It's used to be a middleware to communicate with other components 
 * such as <Canvas></Canvas> <Configuration></Configuration>
 * Will EngineStore may control property which saved in the store rather than other hooks to edit property which is defined in the Store
 * 
 * **/


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
    property?:any
}


interface Focus {
    focusInfo: Map<string, BlockProps>,
    getFocus: (e: React.MouseEvent<HTMLDivElement>, block: BlockProps) => void,
    clearFocus: () => void,
    handleFocusMap: (block: BlockProps, isMultiple?: boolean) => void
}
interface Drag {
    onDragStart: (e: DragEvent, comp: any) => void
    onDragEnd: () => void
    block: BlockProps | any
}
export interface Engine {
    focus: Focus,
    dragger: Drag,
    setFocusInfo:(focusInfo:Map<string, BlockProps>) => void
    setDraggerBlock:(block:BlockProps) => void,
    setBlockProper:(proper:any) => void,
    propers:any | null
}

interface EngineCanvas {
    canvasRef: React.MutableRefObject<any>,
    children: React.ReactNode
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
        block: {}
    },
    propers:null,
    setFocusInfo: () => { },
    setDraggerBlock: () => {},
    setBlockProper: () => {},
})


const EngineProvider = (props: EngineCanvas) => {
    const [dragStart, dragEnd, block] = useDragMenus(props.canvasRef)
    const [getFocus, clearFocus, focusInfo, handleFocusMap] = useFocus()

    useEffect(() => {
        EngineStore.setFocusInfo(focusInfo)
    }, [focusInfo])
    useEffect(() => {
        EngineStore.setDraggerBlock(block)
    }, [block])
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
            propers:{

            },
            setFocusInfo: (focusInfo: Map<string, BlockProps>) => {
                EngineStore.focus.focusInfo = focusInfo
            },
            setDraggerBlock: (block:BlockProps) => {
                EngineStore.dragger.block = block
            },
            setBlockProper: (proper:any) => {
                for (let key in proper) {
                    EngineStore.propers[key] = proper[key]
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