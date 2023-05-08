import React from "react"
import Blocks from '.'
import styles from './index.module.less'

interface CanvasContentProps {
    container:any,
    ref:React.MutableRefObject<any>,
    dragEnd:() => void
}

const CanvasContent = (props:CanvasContentProps) => {

    const {container, dragEnd, ref} = props

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
}

export default CanvasContent