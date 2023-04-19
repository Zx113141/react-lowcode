import { useEffect, useState, forwardRef, useMemo } from 'react'
import styles from './index.module.less'
import DataProvider from '../editor/index'
import Blocks, { type BlockProps } from '../blocks'
interface CanvasProps {
    data: any,
    dragEnd: () => void,
    clearFocus: () => void
}


const EditorContent = forwardRef((props: CanvasProps, ref: any) => {
    // 拖拽事件和组件映射
    const { dragEnd, data, clearFocus } = props
    // container 属性
    const [container, setContainer] = useState<any>(data.container)
    return (
        <div className={styles.canvas}>
            <div className={styles.canvasContent}>
                <div className={styles.canvasContentScroll}
                    style={{ ...container }}
                    ref={ref}
                    onDragEnd={() => dragEnd()}
                    onMouseDown={() => clearFocus()}
                >
                    <Blocks
                        data={data}
                        parentRef={ref}
                        scale={container['--scale']}
                    ></Blocks>
                </div>
            </div>
        </div>
    )
})

export default EditorContent