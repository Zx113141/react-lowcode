
import styles from './index.module.less'
import React, { useContext, ReactNode, forwardRef } from 'react'
import { Engine, EngineContext } from '@/examples/Provider/Engine'

interface CanvasProps {
    // onFocus: any
    // canvaRef: React.MutableRefObject<any>
    configure: ReactNode
    menu: ReactNode
    blocks: ReactNode
    dragEnd: () => void
}


const ContainerPc = forwardRef((props: CanvasProps, ref: any) => {
    const { configure, menu, blocks, dragEnd } = props
    // engine 
    const { container } = useContext<Engine>(EngineContext)
    console.log('container 渲染了')
    return (
        <div className={styles.container}>
            {menu}
            <div className={styles.canvas}>
                <div className={styles.canvasContent}>
                    <div className={styles.canvasContentScroll}
                        style={{ ...container.container }}
                        ref={ref}
                        onDragEnd={() => dragEnd()}
                        onMouseDown={() => dragEnd()}
                    >
                        {blocks}
                    </div>
                </div>


            </div>
            {configure}
        </div>
    )
})

export default React.memo(ContainerPc)