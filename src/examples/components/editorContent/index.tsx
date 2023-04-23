import { useEffect, useState, forwardRef, useContext } from 'react'
import styles from './index.module.less'
import DataProvider from '../editor/index'
import Blocks from '../blocks'
import { Engine, EngineContext } from '@/examples/Provider/Engine'
interface CanvasProps {
}


const EditorContent = forwardRef((props: CanvasProps, ref: any) => {
    // engine 
    const {focus, dragger, container}= useContext<Engine>(EngineContext)
    return (
        <div className={styles.canvas}>
            <div className={styles.canvasContent}>
                <div className={styles.canvasContentScroll}
                    style={{ ...container.container }}
                    ref={ref}
                    onDragEnd={() => dragger.onDragEnd()}
                    onMouseDown={() => focus.clearFocus()}
                >
                    <Blocks
                        parentRef={ref}
                    ></Blocks>
                </div>
            </div>
        </div>
    )
})

export default EditorContent