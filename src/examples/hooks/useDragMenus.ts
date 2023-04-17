import React, { useState } from 'react'


export const useDragMenus = (ref: any,blockItem:any,fn:(blocks:any[]) => void):
[((e: DragEvent, comp: any) => void),() => void ] => {
    // 将修改后的数据同步给dragList
    let current: any = null
    const dragStart = (e: DragEvent, comp: any) => {
        current = comp
        ref.current?.addEventListener('dragenter', dragEnter)
        ref.current?.addEventListener('dragover', dragOver)
        ref.current?.addEventListener('dragleave', dragLeave)
        ref.current?.addEventListener('drop', dragDrop)
    }
    const dragOver = (e: DragEvent) => {
        // e.dataTransfer.dropEffect = 'move'
        e.preventDefault()
    }
    const dragDrop = (e: DragEvent,) => {
        if (!current) return
        fn([...blockItem, {
            style: {
                left: e.offsetX,
                top: e.offsetY,
                zIndex: 4,
                // alignCenter:true
            },

            type: current.key,
            id: String(new Date().getTime()),
            ...current,
        }])
        
        current = null
        console.log('执行了')
        // fn(droppingItem)

    }
    const dragLeave = (e: DragEvent ) => {
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
    return [dragStart, dragEnd]
}