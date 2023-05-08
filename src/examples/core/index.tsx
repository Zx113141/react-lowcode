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
import { CanvasContext } from "../Provider/Canvas"
import { useContext } from "react"

import { useDragMenus } from "../hooks/useDragMenus"


export const injectComponentsMap = (origin: any, newVaue: any) => {

    const components = mixins(origin, newVaue)

    return components

}

export const injectCanvas = () => {


}



interface canvas {
    canvasRef: React.MutableRefObject<any>
}

export const createDragRef = (props: canvas) => {
    const [dragStart, dragEnd] = useDragMenus(props.canvasRef)
    return {
        dragStart,
        dragEnd
    }
}