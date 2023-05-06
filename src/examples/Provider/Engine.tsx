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

import { type EditorProps } from '../components/editor';
import { useContainer } from '../hooks/useContainer';
import { useBlockMoving } from '../hooks/useBlockMoving';
import CanvasProvider from '@/examples/Provider/Canvas'

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
    events?: any,
    container: {
        container: any,
        onContainerEdit: (params: string, value: any) => void,
    },
    blocks: {
        blocks: BlockProps[],
        // asyncBlocks: (action: string, block: BlockProps | BlockProps[],obj?:any) => void
    },
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
    property?: any
}

interface EngineCanvas {
    children: React.ReactNode,
    canvasRef: React.MutableRefObject<any>,
    data: {
        container: any,
        blocks: BlockProps[]
    }
}
export const EngineContext = createContext<Engine>({
    container: {
        container: null,
        onContainerEdit: (params: string, value: any) => { },
    },
    blocks: {
        blocks: [],
        // asyncBlocks: (action: string, block: BlockProps | BlockProps[]) => { }
    },
    // apiConifg: {
    //     setApiData: (values: { [key: string]: any }, focus: Map<string, BlockProps>) => { }
    // }
})


const EngineProvider = (props: EngineCanvas) => {
    const { canvasRef } = props
    // 父容器相关(画布)
    const [container, onContainerEdit] = useContainer(props.data.container)
    // sync blocks 
    const { blocks } = props.data

    const EngineStore = useLocalObservable((): Engine => {
        return {
            blocks: {
                blocks,
            },
            container: {
                container,
                onContainerEdit
            },
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
            <CanvasProvider canvasRef={canvasRef} blocks={blocks}>
                {props.children}
            </CanvasProvider>

        </EngineContext.Provider>
    )
}

export default observer(EngineProvider)