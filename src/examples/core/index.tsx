/***
 * inject canvas, components-map,  events, customs, animations, apis
 * 
 * is there somethtings i can re-use?
 * 
 * 
 * 
 * **/


// import somethings

import { useDragMenus } from "../hooks/useDragMenus"
import { useContext } from 'react'
import { type BlockProps, EngineContext, type Engine } from '@/examples/Provider/Engine';


interface canvas {
    canvasRef: React.MutableRefObject<any>
    // blocks:BlockProps[]
}

export const createDragRef = (props: canvas) => {
    // sync blocks 
    const { canvasRef } = props
    const [dragStart, dragEnd, block] = useDragMenus(canvasRef)
    // const { setInitialValue } = useContext(EngineContext)
    // console.log(111)
    // setInitialValue(data)
    // // doBlocks('add', block)
    // // debugger
    return {
        dragStart,
        dragEnd,
        block
    }
}