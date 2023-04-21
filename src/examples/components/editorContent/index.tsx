import { useEffect, useState, forwardRef, useContext } from 'react'
import styles from './index.module.less'
import DataProvider from '../editor/index'
import Blocks from '../blocks'
import { Engine, EngineContext } from '@/examples/Provider/Engine'
interface CanvasProps {
    data: any,
}


const EditorContent = forwardRef((props: CanvasProps, ref: any) => {
    // 拖拽事件和组件映射
    const { data } = props
    // engine 
    const {focus, dragger}= useContext<Engine>(EngineContext)
    // container 属性
    const [container, setContainer] = useState<any>(data.container)
    return (
        <div className={styles.canvas}>
            <div className={styles.canvasContent}>
                <div className={styles.canvasContentScroll}
                    style={{ ...container }}
                    ref={ref}
                    onDragEnd={() => dragger.onDragEnd()}
                    onMouseDown={() => focus.clearFocus()}
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