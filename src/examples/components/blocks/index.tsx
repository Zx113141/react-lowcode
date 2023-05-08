import React, { useState, useEffect, useContext } from 'react'
import styles from './index.module.less'
import classNames from 'classnames'
// import Block from './block/block'
import { DataContext, DataProviderProps } from '@/examples/Provider/Blocks';
import { BlockProps, EngineContext, Engine } from '@/examples/Provider/Engine';
import { observer } from 'mobx-react-lite';
interface BlocksProps {
    // parentRef: React.MutableRefObject<any>,
}


const Blocks = (props: BlocksProps) => {
    const { widgetMap } = useContext<DataProviderProps>(DataContext)
    const { container, blocks } = useContext<Engine>(EngineContext)

    // 移动， 焦点， 移动倍数
    const { scale } = container.container
    // const { getFocus, focusInfo } = focus

    return (
        <>
            {
                blocks.map((block: BlockProps) => {
                    const Component = widgetMap[block.type].render
                    return (
                        <div key={block.id}
                            className={classNames(styles.block,
                                //  focusInfo.has(block.id) ? styles.blockFocus : ''
                                 )}
                            style={{ ...block.style }}
                            // onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => getFocus(event, block,scale)}
                        >
                            {/* id, data, events,property } */}
                            <Component id={block.id} data={block.data} events={block.events} property={block.property}></Component>
                            {/* <div className={focusItem.has(block.id) ? styles.blockFocus: ''}>

                            </div> */}
                        </div>

                    )
                })
            }
        </>
    )
}

export default observer(Blocks)