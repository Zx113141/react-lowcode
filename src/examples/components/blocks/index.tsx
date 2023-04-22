import React, { useState, useEffect, useContext } from 'react'
import styles from './index.module.less'
import classNames from 'classnames'
// import Block from './block/block'
import { DataContext, DataProviderProps } from '@/examples/Provider/Blocks';
import { BlockProps, EngineContext, Engine } from '@/examples/Provider/Engine';
import { observer } from 'mobx-react-lite';
interface BlocksProps {
    data: any,
    parentRef: React.MutableRefObject<any>,
    scale: number
}


const Blocks = (props: BlocksProps) => {
    const { data, parentRef: ref, scale } = props
    const { focus, dragger } = useContext<Engine>(EngineContext)
    const { widgetMap } = useContext<DataProviderProps>(DataContext)
    const { block } = dragger
    const { getFocus, focusInfo, handleFocusMap } = focus
    // 所有blocks
    const [blocks, setBlocks] = useState<any>(data.blocks || [])
    // 鼠标点击坐标
    const [movingStart, setMovingStart] = useState<any>(null)

    useEffect(() => {
        if (block && JSON.stringify(block) !== '{}') {
            handleFocusMap(block as BlockProps)
            setBlocks([...blocks, block])
        }
    }, [block])
    // 根据focus 进行组件移动
    const handleFocus = (e: React.MouseEvent<HTMLDivElement>, block: BlockProps) => {
        getFocus(e, block)
        setMovingStart({
            startX: e.clientX / scale,
            startY: e.clientY / scale,
        })

    }

    useEffect(() => {
        if (focusInfo.size > 0 && (movingStart)) {
            ref.current.addEventListener('mousemove', handleMove)
            ref.current.addEventListener('mouseup', revokeMove)
        }

    }, [focusInfo, movingStart])

    const handleMove = (e: MouseEvent) => {
        let positions: BlockProps[] = []
        if (!movingStart) return
        let currX = e.clientX / scale - movingStart.startX
        let currY = e.clientY / scale - movingStart.startY
        for (let item of focusInfo.values()) {
            positions.push({
                ...item,
                style: {
                    ...item.style,
                    left: (item.style.left as number + currX),
                    top: (item.style.top as number + currY),
                },
            })
        }
        positions = blocks.map((block: BlockProps) => {
            let repla = positions.find((position: BlockProps) => position.id === block.id)
            if (repla) {
                return {
                    ...repla
                }
            } else {
                return block
            }
        })

        setBlocks(positions)
    }
    const revokeMove = () => {
        ref.current.removeEventListener('mousemove', handleMove)
        ref.current.removeEventListener('mouseup', revokeMove)
        setMovingStart(null)
    }

    return (
        <>
            {
                blocks.map((block: BlockProps) => {
                    const Component = widgetMap[block.type].render
                    return (
                        <div key={block.id}
                            className={classNames(styles.block, focusInfo.has(block.id) ? styles.blockFocus : '')}
                            style={{ ...block.style }}
                            onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => handleFocus(event, block)}
                        >
                            <Component ></Component>
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