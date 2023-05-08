/***
 * Engine may be dutied to control <dragger> <focus> <moving> <...> 
 * It's used to be a middleware to communicate with other components and offer to blocks and container
 * such as <Canvas></Canvas> <Configuration></Configuration>, 
 * and its responsed to manage other Engine without none of I/O and none Of UI
 * 
 * The next key point is that we should do somethings for `Property`, `Events`, `Data` and synchronous block to blocks
 * 
 * seperate canvas , output JSON 
 * 
 * s
 * **/

import { observer, useLocalObservable } from 'mobx-react-lite';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useBlocksSync } from "../hooks/useBlocksSync"
import { type EditorProps } from '../components/editor';
import { useContainer } from '../hooks/useContainer';
import { useDragMenus } from '../hooks/useDragMenus';
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

export interface Engine {
    container: {
        container: any,
        onContainerEdit: (params: string, value: any) => void,
    },
    blocks: BlockProps[],
    dragger?:{
        dragStart:(e: React.DragEventHandler<HTMLDivElement>, comp: any) => void
        dragEnd:() => void
    }
    // doBlocks: (action: string, block: BlockProps | BlockProps[]) => void
    // apiConifg: {
    //     api?: 'static' | 'dynamic',
    //     data?: any,
    //     action?: {
    //         method: 'post' | 'get' | 'option' | 'put' | 'delete' | string,
    //         param?: string,
    //         url: string,
    //         tokens?: any,
    //         isPolling?: boolean,
    //         polling?: number
    //     },
    //     setApiData: (values: { [key: string]: any }, focus: Map<string, BlockProps>) => void
    // },

}

interface EngineCanvas {
    children: React.ReactNode,
    // canvasRef: React.MutableRefObject<any>,
    data: {
        container: any,
        blocks: BlockProps[]
    },
    canvasRef:React.MutableRefObject<any>
}
export const EngineContext = createContext<Engine>({
    container: {
        container: null,
        onContainerEdit: (params: string, value: any) => { },
    },
    blocks: [],
    // dragger:{
    //     dragStart: () => {},
    //      dragEnd: () => {},
    // }
    // apiConifg: {
    //     setApiData: (values: { [key: string]: any }, focus: Map<string, BlockProps>) => { }
    // }
    // doBlocks: (action: string, block: BlockProps | BlockProps[]) => { }
})


const EngineProvider = (props: EngineCanvas) => {
    // const { canvasRef } = props
    // 父容器相关(画布)
    const [container, onContainerEdit] = useContainer(props.data.container)
    // sync blocks 
    const [dragStart, dragEnd, block] = useDragMenus(props.canvasRef)
    // moving Blocks
    const [] = useBlockMoving
    const [blocks, asyncBlocks] = useBlocksSync(props.data.blocks)
    useEffect(() => {
        if (block.id) {
            asyncBlocks('add', block)
        }
    },[block])

    useEffect(() => {
        EngineStore.blocks = blocks
    },[blocks])

    const EngineStore = useLocalObservable((): Engine => {
        return {
            blocks,
            container: {
                container,
                onContainerEdit
            },
            dragger:{
                dragStart, 
                dragEnd,
            },
            moving:{
                handleMoving
            }
            // doBlocks:asyncBlocks,
            // property: {
            //     setProperty: (values: { [key: string]: any }, focus: Map<string, BlockProps>) => {

            //     }
            // },
            // apiConifg: {
            //     setApiData: (values: { [key: string]: any }, focus: Map<string, BlockProps>) => {
            //     }
            // }
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
