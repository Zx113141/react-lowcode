import { useEffect, useState, forwardRef } from 'react'
import styles from './index.module.less'
import DataProvider from '../editor/index'
import Blocks, { type BlockProps } from '../blocks'
import { useFocus } from '@/examples/hooks/useFocus'
interface CanvasProps {
    container: any,
    blocks:any[],
    // canvasRef: any
    dragEnd: () => void,
    widgetMap: any,
    exploreFocus: (focusInfo: Map<string, FocusMap>, isMulti: boolean) => void
}

export interface FocusMap {
    [key: string]: BlockProps
}
const EditorContent = forwardRef((props: CanvasProps, ref: any) => {
    // 拖拽事件和组件映射
    const { dragEnd, widgetMap, exploreFocus,container, blocks } = props
    // 创建focus映射
    const [getFocus, clearFocus, focusInfo] = useFocus(ref)

    // 根据focus 进行组件移动
    let movingStart = {}
    const handleFocus = (e: MouseEvent, block: BlockProps) => {
        getFocus(e, block)
        movingStart = {
            startX: e.clientX,
            startY: e.clientY,
        }
        console.log(focusInfo)
        ref.current.addEventListener('mousemove', handleMove)
        ref.current.addEventListener('mouseup', revokeMove)
    }

    useEffect(() => {
        if (focusInfo.size > 0) {
            if (focusInfo.size > 1) {
                exploreFocus(focusInfo, true)
            } else {
                exploreFocus(focusInfo, false)
            }
        }

    }, [focusInfo])

    const handleMove = (e: MouseEvent) => {
        let positions = []
        for (let item of focusInfo.values()) {
            positions.push({
                left: item.style
            })
        }
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