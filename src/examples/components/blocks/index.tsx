import styles from './index.module.less'
import classNames from 'classnames'
import {type FocusMap} from '../editorContent/index'
// import Block from './block/block'
interface BlocksProps {
    blocks: any[],
    focusItem: Map<string, BlockProps>,
    widgetMap: WidgetMap,
    handleFocus: (e:MouseEvent,blcok:BlockProps) => void
}

interface WidgetMap {
    [key: string]: Widget
}
interface Widget {
    key: string,
    name: string,
    preview: () => JSX.Element
    render: () => JSX.Element
}

export interface BlockProps {
    type: string,
    id: string,
    style: React.CSSProperties,
    action?: any,
    data?: any,
    widgetMap: any
    foucus?: boolean
}

const Blocks = (props: BlocksProps) => {
    const { blocks, focusItem, widgetMap,handleFocus } = props
    return (
        <>
            {
                blocks.map((block: BlockProps) => {
                    const Component = widgetMap[block.type].render
                    return (
                        <div key={block.id}
                            className={classNames(
                                styles.block, focusItem.has(block.id) ? 
                                styles.blockFocus 
                                : '', 
                                block.foucus ? 
                                styles.blockResize : '')}
                            style={{ ...block.style }}
                            onMouseDown={(e:MouseEvent) => handleFocus(e, block)}
                        >
                            <Component data={block.data} action={block.action} ></Component>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Blocks