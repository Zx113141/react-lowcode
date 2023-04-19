import React, { useState, useCallback } from 'react'
import { BlockProps } from '../components/blocks'

export const useDragMenus = (ref: any):
    [((e: DragEvent, comp: any) => void), () => void, BlockProps | any] => {
    // 将修改后的数据同步给dragList
    const [block, setBlock] = useState<BlockProps | {}>({})

    let current: any = null
    const dragStart = useCallback((e: DragEvent, comp: any) => {
        current = comp
        ref.current?.addEventListener('dragenter', dragEnter)
        ref.current?.addEventListener('dragover', dragOver)
        ref.current?.addEventListener('dragleave', dragLeave)
        ref.current?.addEventListener('drop', dragDrop)
    }, [ref])
    const dragOver = (e: DragEvent) => {
        // e.dataTransfer.dropEffect = 'move'
        e.preventDefault()
    }
    // 放置后要获取焦点
    const dragDrop = (e: DragEvent,) => {
        if (!current) return
        setBlock({
            style: {
                left: e.offsetX,
                top: e.offsetY,
                zIndex: 4,
                // alignCenter:true
            },
            type: current.key,
            id: String(new Date().getTime()),
            ...current,
        })
        current = null
    }
    const dragLeave = (e: DragEvent) => {
        e.dataTransfer.dropEffect = 'none'
    }
    const dragEnter = (e: DragEvent) => {
        e.dataTransfer.dropEffect = 'move'
    }
    const dragEnd = () => {
        ref.current?.removeEventListener('dragenter', dragEnter)
        ref.current?.removeEventListener('dragover', dragOver)
        ref.current?.removeEventListener('dragleave', dragLeave)
        ref.current?.removeEventListener('drop', dragDrop)
    }
    return [dragStart, dragEnd, block]
}