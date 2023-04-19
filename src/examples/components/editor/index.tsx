
import ContainerPc from "./container"
import { useCallback, useEffect, useMemo, useRef } from "react"
import Menu from '@/examples/components/menu'
import { useState, createContext } from 'react'
import EditorContent from "../editorContent"
import ConfigurationsContent from "../configuration"
import Nav from "../../hooks/nav"
import { useDragMenus } from "@/examples/hooks/useDragMenus"
import { useComponentMap } from "@/examples/hooks/useComponentMap"
import { type Items } from "@/examples/components/menu"
import { BlockProps } from "../blocks"
import { useBlockItem } from "@/examples/hooks/useBlockItem"
import { useFocus } from '@/examples/hooks/useFocus'
interface EditorProps {
    widgetList: Items[],
    data: any
}

interface EditorContextProps {
    theme?: string,
    language?: string,
    configs: any
}

interface DataProviderProps {
    widgetMap: any,
    focus: {
        focusInfo: Map<string, BlockProps>,
        getFocus: (e: React.MouseEvent<HTMLDivElement>, block: BlockProps) => void,
        clearFocus: () => void,
        handleFocusMap: (block: BlockProps, isMultiple?: boolean) => void
    }
    block?: BlockProps
}

const EditorContext = createContext<EditorContextProps>({
    configs: {},
    theme: 'dark',
    language: 'zh_cn',
})

export const DataProvider = createContext<DataProviderProps>({
    widgetMap: {},
    focus: {
        focusInfo: new Map(),
        getFocus: (e: React.MouseEvent<HTMLDivElement>, block: BlockProps) => { },
        clearFocus: () => { },
        handleFocusMap:(block: BlockProps, isMultiple?: boolean) => {}
    }
})


const Editor = (props: EditorProps) => {

    // 外部传入数据源
    const { widgetList, data } = props

    // 菜单相关
    const [collapse, setCollapse] = useState<boolean>(false)

    const canvasRef = useRef() as React.MutableRefObject<any>
    // 负责菜单拖拽 和 放置事件
    const [dragStart, dragEnd, block] = useDragMenus(canvasRef)
    // 获取选中foucusMap
    const [getFocus, clearFocus, focusInfo, handleFocusMap] = useFocus()
    // 
    const [widgetMap] = useComponentMap(widgetList)
    // 根据选中元素获取schema文件
    // hooks
    // const [] = useBlockItem(focus)
    useEffect(() => {
    
    }, [focus])
    // 菜单拖拽

    // functions
    const changeCollapse = useCallback(() => {
        setCollapse(!collapse)
    }, [collapse])
    const handleClick = useCallback(() => {
        return () => {

        }
    }, [])
    // 暴露focusInfo map
    const getFocusInfo = (focusInfo: Map<string, BlockProps>) => {
        // setFocusMap(focusInfo)
    }
    return (
        <>
            <EditorContext.Provider value={{
                configs: {},
                theme: 'dark',
                language: 'zh_cn',
            }}>
                <EditorContext.Consumer>
                    {
                        (editorConfigCtx) => (<>
                            <Nav handleClick={() => handleClick()} ></Nav>

                            <DataProvider.Provider value={{
                                widgetMap,
                                focus: {
                                    focusInfo,
                                    clearFocus,
                                    getFocus,
                                    handleFocusMap
                                },
                                block,
                            }}>
                                <ContainerPc>
                                    <DataProvider.Consumer>
                                        {
                                            (mapsCtx) => (
                                                <>
                                                    <Menu
                                                        onCollapse={() => changeCollapse()}
                                                        items={widgetList}
                                                        dragStart={(e: DragEvent, comp: any) => dragStart(e, comp)}
                                                    ></Menu>
                                                    <EditorContent
                                                        clearFocus={clearFocus}
                                                        data={data}
                                                        {...editorConfigCtx}
                                                        ref={canvasRef}
                                                        dragEnd={() => dragEnd()}
                                                    ></EditorContent>
                                                    <ConfigurationsContent focusInfo={mapsCtx.focus.focusInfo} ></ConfigurationsContent>
                                                </>
                                            )
                                        }
                                    </DataProvider.Consumer>
                                </ContainerPc>
                            </DataProvider.Provider>
                        </>)
                    }
                </EditorContext.Consumer>
                {/* <TreeNode.Provider>

                </TreeNode.Provider> */}

            </EditorContext.Provider>
        </>
    )
}

export default Editor