import { useEffect, useState, forwardRef, useContext } from 'react'
import styles from './index.module.less'
import Blocks from '../blocks'
import { Engine, EngineContext } from '@/examples/Provider/Engine'
interface CanvasProps {
    dragEnd: any
}


const EditorContent = forwardRef((props: CanvasProps, ref: any) => {
    const { dragEnd } = props
    // engine 
    const { container } = useContext<Engine>(EngineContext)
    return (
        <div className={styles.canvas}>
            <div className={styles.canvasContent}>
                <div className={styles.canvasContentScroll}
                    style={{ ...container.container }}
                    ref={ref}
                    onDragEnd={() => dragEnd()}
                // onMouseDown={() => focus.clearFocus()}
                >
                    <Blocks
                    ></Blocks>
                </div>
            </div>
        </div>
    )
})

export default EditorContent