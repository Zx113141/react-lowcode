import { useImperativeHandle, useContext,useRef } from 'react'
import styles from './index.module.less'
import CanvasContent from '../blocks/parent'
import { Engine, EngineContext } from '@/examples/Provider/Engine'
interface CanvasProps {
    dragEnd: () => void,
    onFocus:any
    canvaRef:React.MutableRefObject<any>
}


const EditorContent = (props: CanvasProps) => {
    const { dragEnd } = props
    const ref = useRef() as React.MutableRefObject<any>
    // engine 
    const { container } = useContext<Engine>(EngineContext)
    return (
        <div className={styles.canvas}>
            <div className={styles.canvasContent}>
                <CanvasContent container={container} dragEnd={dragEnd} ref={ref}></CanvasContent>
            </div>
        </div>
    )
}

export default EditorContent