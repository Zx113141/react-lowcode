import React, { useState ,useCallback} from "react";
import {type BlockProps } from "../Provider/Engine";

export const useFocus = ():
[((e: React.MouseEvent<HTMLDivElement>, block: BlockProps,scale:number) => void),
    () => void  , Map<string, BlockProps>,
    (block: BlockProps, isMultiple?: boolean) => void,
    {
        startX:number,
        startY:number,
        scale:number
    }
] => {

    const [focusInfo, setFocusInfo] = useState<Map<string, BlockProps>>(new Map())
    const [mouseStartMoving, setMouseStartMoving] = useState({
        startX:0,
        startY:0,
        scale:0
    })

    const getFocus = (e: React.MouseEvent<HTMLDivElement>, block: BlockProps,scale:number) => {
        e.preventDefault()
        e.stopPropagation()
        setMouseStartMoving({
            startX:e.clientX,
            startY:e.clientY,
            scale,
        })
        if (e.ctrlKey) {
            handleFocusMap(block, true, )
        } else {
            handleFocusMap(block)
        }


    }
    const handleFocusMap = (block: BlockProps, isMultiple?: boolean) => {
        let focus = new Map(focusInfo)
        if (isMultiple) {
            if (focus.has(block.id)) {
                focus.delete(block.id)
            } else {
                focus.set(block.id, block)
            }
        } else {
            if (focus.has(block.id)) {
                return
            } else {
                focus.clear()
                focus.set(block.id, block)
            }
     
     
        }
        console.log('焦点获取成功')
        setFocusInfo(focus)
    }
    const clearFocus = () => {
        let focus = new Map(focusInfo)
        focus.clear()
        setFocusInfo(focus)
    }


    return [getFocus, clearFocus, focusInfo,handleFocusMap,mouseStartMoving]
}