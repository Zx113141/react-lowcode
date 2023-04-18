import { useEffect, useState, forwardRef, useMemo } from 'react'
import styles from './index.module.less'
import DataProvider from '../editor/index'
import Blocks, { type BlockProps } from '../blocks'
import produce from 'immer'
import { useFocus } from '@/examples/hooks/useFocus'
interface CanvasProps {
    container: any,
    blocks: any[],
    // canvasRef: any
    dragEnd: () => void,
    widgetMap: any,
    exploreFocus: (focusInfo: Map<string, BlockProps>) => void,
    setBlocks: React.Dispatch<any[]>
}


const EditorContent = forwardRef((props: CanvasProps, ref: any) => {
    // 拖拽事件和组件映射
    const { dragEnd, widgetMap, exploreFocus, container, blocks, setBlocks } = props
    // 创建focus映射
    const [getFocus, clearFocus, focusInfo] = useFocus()

    // 鼠标点击坐标
    const [movingStart, setMovingStart] = useState({
        startX: 0,
        startY: 0,
    }) 
    // 根据focus 进行组件移动
    const handleFocus = (e: MouseEvent, block: BlockProps) => {
        getFocus(e, block)
        setMovingStart({
            startX: e.clientX,
            startY: e.clientY,
        })
    
    }

    useEffect(() => {
        if (focusInfo.size > 0) {
            exploreFocus(focusInfo)
            ref.current.addEventListener('mousemove', handleMove)
            ref.current.addEventListener('mouseup', revokeMove)
            console.log('焦点')
        }

    }, [focusInfo])

    const handleMove = (e: MouseEvent) => {
        let positions: BlockProps[] = []
        let currX = e.clientX - movingStart.startX
        let currY = e.clientY - movingStart.startY
        for (let item of focusInfo.values()) {
            positions.push({
                ...item,
                style: {
                    ...item.style,
                    left: item.style.left as number + currX,
                    top: item.style.top as number + currY,
                }
            })
        }
        positions = blocks.map((block: BlockProps) => {
            let repla = positions.find((position: BlockProps) => position.id === block.id)
            if (repla) {
                return {
                    ...repla
                }
            } else {
                return block
            }
        })
        setBlocks(positions)
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