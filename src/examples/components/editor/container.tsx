
import styles from './index.module.less'
import React, { useContext, ReactNode, forwardRef } from 'react'
import { Engine, EngineContext } from '@/examples/Provider/Engine'

interface CanvasProps {
    // onFocus: any
    // canvaRef: React.MutableRefObject<any>
    configure: ReactNode
    menu: ReactNode
    blocks: ReactNode
}


const ContainerPc = forwardRef((props: CanvasProps, ref: any) => {
    const {  configure, menu ,blocks} = props
    // engine 
    const { container ,dragger} = useContext<Engine>(EngineContext)
    console.log('container 渲染了')
    return (
        <div className={styles.container}>
            {menu}
            <div className={styles.canvas}>
                <div className={styles.canvasContent}>
                    <div className={styles.canvasContentScroll}
                        style={{ ...container.container }}
                        ref={ref}
                        onDragEnd={() => dragger?.dragEnd()}
                    // onMouseDown={() => focus.clearFocus()}
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