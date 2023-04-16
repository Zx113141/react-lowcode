import { useEffect, useState, forwardRef } from 'react'
import styles from './index.module.less'
import DataProvider from '../editor/index'
import Blocks, { type BlockProps } from '../blocks'
import { useFocus } from '@/examples/hooks/useFocus'
interface CanvasProps {
    data: any,
    // canvasRef: any
    dragEnd: () => void,
    widgetMap: any
}

export interface FocusMap {
    [key: string]: BlockProps
}
const EditorContent = forwardRef((props: CanvasProps, ref: any) => {
    const { container, blocks } = props.data
    const { dragEnd, widgetMap } = props
    // 创建focus映射
    const [getFocus, clearFocus, focusInfo] = useFocus<any>(ref)

    // 根据focus 进行组件移动
    let movingStart = {}
    const handleFocus = (e: MouseEvent, block: BlockProps) => {
        getFocus(e, block)
        if (focusInfo.size > 0)
            movingStart = {
                startX: e.clientX,
                startY: e.clientY,
                // startPos: focusInfo?.map((it: any) => ({
                //     left: it.style.left,
                //     top: it.style.top
                // }))
        }
        // console.log(focusInfo)
        ref.current.addEventListener('mousemove', handleMove)
        ref.current.addEventListener('mouseup', revokeMove)
    }
    useEffect(() => {

    },[focusInfo])
    const handleMove = (e: MouseEvent) => {

    }
    const revokeMove = (e: MouseEvent) => {
        ref.current.removeEventListener('mousemove', handleMove)
        ref.current.removeEventListener('mouseup', revokeMove)
    }
    return (
        <div className={styles.canvas}>
            <div className={styles.canvasContent}>
                <div className={styles.canvasContentScroll} style={{ ...container }} ref={ref} onDragEnd={() => dragEnd()} onMouseDown={() => clearFocus()}>
                    <Blocks blocks={blocks} focusItem={focusInfo} widgetMap={widgetMap} handleFocus={(e: MouseEvent, block: BlockProps) => handleFocus(e, block)}></Blocks>
                </div>
            </div>
        </div>
    )
})

export default EditorContent