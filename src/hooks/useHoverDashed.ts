import React from "react";

export const useHoverDashed = (status: string = 'hover') => {
    if (status === 'hover') {
        const rect: any = {}
        const getItem = (e, props) => {
            rect.style = props.style,
                rect.lineWidth = 3,
                rect.lineStyle = '#000'
            rect.position = {
                x: e.clientX,
                y: e.clientY,
            }
        }

        return {
            rect,
            getItem
        }
    }else {

    }

    // return {
    //     width:,
    //     height
    // }
}