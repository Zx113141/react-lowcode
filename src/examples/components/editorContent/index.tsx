import { forwardRef, useContext } from 'react'
import styles from './index.module.less'
import CanvasContent from '../blocks/parent'
import { Engine, EngineContext } from '@/examples/Provider/Engine'
interface CanvasProps {
    dragEnd: any,
    onFocus:any
}


const EditorContent = forwardRef((props: CanvasProps, ref: any) => {
    const { dragEnd } = props
    // engine 
    const { container } = useContext<Engine>(EngineContext)
    return (
        <div className={styles.canvas}>
            <div className={styles.canvasContent}>
                <CanvasContent container={container} dragEnd={dragEnd} ref={ref}></CanvasContent>
            </div>
        </div>
    )
})

export default EditorContent