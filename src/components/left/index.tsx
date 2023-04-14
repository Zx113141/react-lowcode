import styles from './index.module.less'
import React from 'react'
const Left = (props: any) => 
{
    const { label, preview, dragStart, dragEnd,  } = props
    return (
        <div
            className={styles.editorLeftItem}
            draggable
            onDragStart={e => dragStart(e, props)}
            onDragEnd={() => dragEnd()}

        >
            <span className={styles.editorLeftItemTitle}>{label}</span>
            <div className={styles.editorLeftItemPreview}>
                {
                    preview
                }
            </div>
        </div>
    )
}

export default React.memo(Left)