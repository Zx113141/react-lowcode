/***
 * It's used to be resolve dragger focus and moving
 * 
 * **/

import { useState, useMemo, useContext, createContext, ReactNode, useEffect } from "react";
import { observer, useLocalObservable } from "mobx-react-lite";
import { BlockProps } from "./Engine";
import { useDragMenus } from '../hooks/useDragMenus';
import { useFocus } from '../hooks/useFocus';
import { useBlocksSync, type path } from '../hooks/useBlocksSync';


const CanvasContext = createContext<any>(null)

interface CanvasProps {
    canvasRef: React.MutableRefObject<any>,
    children: ReactNode,
    blocks: BlockProps[]
}

const CanvasProvider = (props: CanvasProps) => {
    // do DraggerEnd, Moving, Focus
    const { canvasRef } = props
    const [dragStart, dragEnd, block] = useDragMenus(canvasRef)
    const focusBlock: BlockProps | null = null
    useEffect(() => {
        canvasStore.focusBlock = block
    },[block])
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