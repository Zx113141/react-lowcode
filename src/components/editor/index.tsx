import React, { useMemo, useRef, createContext, useState } from "react";
import style from './index.module.less'
import Blocks from "../blocks";
import Left from "../left";
import produce from "immer";
import { observer } from "mobx-react-lite";
// import {EditorProps} from "./index.d.ts"
import { useComponents } from "@/hooks/useComponents";
import { useMenuDrag } from "@/hooks/useMenuDrag";
import { useDragList } from "@/hooks/useDragList";
import { useContainer } from '@/hooks/useContainer';
import { useFocus } from "@/hooks/useFocus";
import { useHoverDashed } from "@/hooks/useHoverDashed";
export interface EditorProps {
    data: any
}
export const List = createContext(null)
export const BlockList = createContext([])
const Editor = (props: EditorProps) => {
    let movingStart = {}
    const { data } = props
    const ref = useRef<HTMLDivElement>()
    // 编辑基本属性
    const { container, setContainer } = useContainer(data)
    // 获取list 中所有组件,并提供修改接口，同步数据
    const [blockList, updateBlocks, addBlock] = useDragList(data.blocks)
    // 所有列表项 和 组件映射关系
    const { widgetMap, componentsList } = useMemo(() => useComponents(blockList), [blockList])
    // 活动状态组件
    const [dragStart, dragEnd] = useMenuDrag(ref, addBlock)
    // 焦点获取与失焦
    const [clearFocus, getFocus, unFocus, focus] = useMemo(() => useFocus(blockList, updateBlocks), [blockList])
    // canvas hover 弹出框

    // const { rect, getItem } = useHoverDashed()
    // useMoveing = 
    // 鼠标选中后移动
    const onFocus = (e: PointerEvent, comp) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.ctrlKey) {
            getFocus(comp, 'multiple')
        } else {
            getFocus(comp, 'single')
        }
        // 获取focus 和 unfocus 进行遍历获取拖动
        movingStart = {
            startX: e.clientX,
            startY: e.clientY,
            startPos: focus?.map((it: any) => ({
                left: it.style.left,
                top: it.style.top
            }))
        }
        if (focus.length) {
            document.addEventListener('mousemove', onMoveing)
            document.addEventListener('mouseup', revolkeItem)
        }
    }
    const revolkeItem = (e) => {
        document.removeEventListener('mousemove', onMoveing)
        document.removeEventListener('mouseup', revolkeItem)
    }
    const onMoveing = (e) => {
        const { clientX, clientY } = e
        let durX = clientX - movingStart.startX
        let durY = clientY - movingStart.startY
        let newMoving = focus.map((it) => ({
            ...it,
            style: {
                ...it.style,
                left: it.style.left + durX,
                top: it.style.top + durY
            }
        }))
        updateBlocks(newMoving.concat(unFocus))
    }
    return (
        <List.Provider value={widgetMap}>
            <div className={style.editor}>
                <div className={style.editorLeft}>
                    {
                        componentsList.map((it) => {
                            return <Left key={it.key} {...it} dragStart={(e, comp) => dragStart(e, comp)} dragEnd={() => dragEnd()}></Left>
                        })
                    }
                </div>
                <div className={style.editorOpr}>操作侧</div>
                <div className={style.editorRight}>属性区域</div>
                <div className={style.editorContainer}>
                    {/* 滚动条 */}
                    <div className={style.editorContainerCanvas}>
                        {/* 内容区域 */}
                        <div className={style.editorContainerCanvasContent} style={{ ...container }} ref={ref} onMouseDown={() => clearFocus()}>

                            {
                                blockList.map((it, index) => {
                                    return (
                                        <Blocks
                                            {...it}
                                            style={it.style}
                                            action={it.action}
                                            key={it.id}
                                            type={it.type}
                                            onMousedown={(e, comp) => onFocus(e, comp)}

                                        >

                                        </Blocks>
                                    )
                                })
                            }
                            {/* {
                                rect.style && <Hover rect={rect}></Hover>
                            } */}
                        </div>
                    </div>
                </div>
            </div>
        </List.Provider>
    )
}

export default observer(Editor)