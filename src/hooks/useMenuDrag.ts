
export const useMenuDrag = (ref: any,fn) => {

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
        const droppingItem = {
            style: {
                left: e.offsetX,
                top: e.offsetY,
                zIndex: 4,
                // alignCenter:true
            },
            type: current.type,
            id: String(new Date().getTime())

        }
        fn(droppingItem)
        current = null
        // console.log('执行了')
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
    return [ dragStart, dragEnd]
}