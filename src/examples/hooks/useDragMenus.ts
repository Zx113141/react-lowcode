import React, { useState, useCallback } from 'react'
import {type BlockProps } from '../Provider/Engine'

export const useDragMenus = (ref: any):
    [((e: React.DragEventHandler<HTMLDivElement>, comp: any) => void), () => void, ] => {
    // 将修改后的数据同步给dragList
    // const [block, setBlock] = useState<BlockProps | {}>({})
    let current: any = null
    const dragStart = useCallback((e: React.DragEventHandler<HTMLDivElement>, comp: any) => {
        current = comp
        ref.current?.addEventListener('dragenter', dragEnter)
        ref.current?.addEventListener('dragover', dragOver)
        ref.current?.addEventListener('dragleave', dragLeave)
        ref.current?.addEventListener('drop', dragDrop)
    }, [ref])
    const dragOver = (e: React.DragEventHandler<HTMLDivElement>) => {
        // e.dataTransfer.dropEffect = 'move'
        e.preventDefault()
    }
    // 放置后要获取焦点
    const dragDrop = (e: React.DragEventHandler<HTMLDivElement>,) => {
        if (!current) return
        // setBlock({
        //     style: {
        //         left: e.offsetX,
        //         top: e.offsetY,
        //         zIndex: 4,
        //         // alignCenter:true
        //     },
        //     type: current.key,
        //     id: String(new Date().getTime()),
        //     ...current,
        // })
        console.log('放置成功')
        current = null
    }
    const dragLeave = (e: React.DragEventHandler<HTMLDivElement>) => {
        // e.dataTransfer.dropEffect = 'none'
    }
    const dragEnter = (e: React.DragEventHandler<HTMLDivElement>) => {
        // e.dataTransfer.dropEffect = 'move'
    }
    const dragEnd = useCallback(() => {
        ref.current?.removeEventListener('dragenter', dragEnter)
        ref.current?.removeEventListener('dragover', dragOver)
        ref.current?.removeEventListener('dragleave', dragLeave)
        ref.current?.removeEventListener('drop', dragDrop)
    },[ref])
    return [dragStart, dragEnd]
}