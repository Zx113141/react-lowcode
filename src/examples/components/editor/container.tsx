
import styles from './index.module.less'
import { useImperativeHandle, useContext, useRef, ReactNode } from 'react'
// import styles from './index.module.less'
import CanvasContent from '../blocks/parent'
import { Engine, EngineContext } from '@/examples/Provider/Engine'
interface CanvasProps {
    dragEnd: () => void,
    onFocus: any
    canvaRef: React.MutableRefObject<any>
    configure: ReactNode
    menu: ReactNode
}


const ContainerPc = (props: CanvasProps) => {
    const { dragEnd, configure, menu } = props
    const ref = useRef() as React.MutableRefObject<any>
    // engine 
    const { container } = useContext<Engine>(EngineContext)
    return (
        <div className={styles.container}>
            {
                menu
            }
            <div className={styles.canvas}>
                <div className={styles.canvasContent}>
                    <CanvasContent container={container} dragEnd={dragEnd} ref={ref}></CanvasContent>
                </div>


            </div>
            {
                configure
            }
        </div>
    )
}

export default ContainerPc