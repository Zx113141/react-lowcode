import React, { forwardRef } from "react"
import Blocks from '.'
import styles from './index.module.less'

interface CanvasContentProps {
    container:any,
    dragEnd:() => void
}

const CanvasContent = forwardRef((props:CanvasContentProps,ref:any) => {

    const {container, dragEnd} = props

    return (
        <div className={styles.canvasContentScroll}
            style={{ ...container.container }}
            ref={ref}
            onDragEnd={() => dragEnd()}
        // onMouseDown={() => focus.clearFocus()}
        >
            <Blocks
            ></Blocks>
        </div>
    )
})

export default CanvasContent