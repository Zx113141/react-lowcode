import React, { useState } from "react";
import  {type BlockProps} from '@/examples/components/blocks/index'
// interface FocusMap {
//     [key:string]:BlockProps
// }


export const useFocus = (ref:HTMLDivElement):[((e: MouseEvent, block: BlockProps) => void),() => void  , Map<string, BlockProps>] => {

    const [focusInfo, setFocusInfo] = useState<Map<string, BlockProps>>(new Map())

    const getFocus = (e: MouseEvent, block: BlockProps) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.ctrlKey) {
            handleFocusMap(block, true)
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
            focus.clear()
            focus.set(block.id, block)
        }
        setFocusInfo(focus)
    }
    const clearFocus = () => {
        let focus = new Map(focusInfo)
        focus.clear()
        setFocusInfo(focus)
    }


    return [getFocus, clearFocus, focusInfo]
}