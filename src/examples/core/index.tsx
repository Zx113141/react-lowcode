/***
 * inject canvas, components-map,  events, customs, animations, apis
 * 
 * is there somethtings i can re-use?
 * 
 * 
 * 
 * **/


// import somethings
import { mixins } from "../utils/mixin"
import {CanvasContext} from "../Provider/Canvas"
import { useContext } from "react"
export const injectComponentsMap = (origin:any, newVaue:any) => {

    const components = mixins(origin, newVaue)

    return components

}

export const injectCanvas =() => {

    
}

export const injectSchema = () => {


}

interface canvas {
    canvasRef: React.MutableRefObject<any>
}

export const createDragRef = (props:canvas) => {
    
    // 连接Engin内部的 dragStart and dragEnd
    const dragStart = () => {

    }
    
    const dragEnd = () => {

    }

    return {
        dragStart,
        dragEnd
    }
}