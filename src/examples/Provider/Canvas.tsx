/***
 * It's used to be resolve dragger focus and moving
 * 
 * **/

import { useState, useMemo, useContext, createContext, ReactNode } from "react";
import { observer, useLocalObservable } from "mobx-react-lite";
import { BlockProps } from "./Engine";

const CanvasContext = createContext<any>(null)

interface CanvasProps {
    canvasRef: React.MutableRefObject<any>,
    children: ReactNode,
}

const CanvasProvider = (props: CanvasProps) => {
    // do DraggerEnd, Moving, Focus
    const { canvasRef } = props

    const focusBlock: BlockProps | null = null

    const canvasStore = useLocalObservable(() => {


        return {
            focusBlock,
            // get x,y when block mousedown and prepare moving
            onBlockMouseDown: ({ x, y }: { x: number, y: number }) => {


            },
            // handle block moving
            onBlockMoving: ({ x, y }: { x: number, y: number }) => {


            }
        }
    })


    return <CanvasContext.Provider value={canvasStore}>
        {props.children}
    </CanvasContext.Provider>
}

export default observer(CanvasProvider)