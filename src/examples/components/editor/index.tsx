
import ContainerPc from "./container"
import { useEffect, useRef } from "react"
import Menu from '@/examples/components/menu'
import { useState, createContext } from 'react'
import EditorContent from "../editorContent"
import ConfigurationsContent from "../configuration"
import Nav from "../nav"
import { useDragMenus } from "@/examples/hooks/useDragMenus"
import { useComponentMap } from "@/examples/hooks/useComponentMap"
import { type Items } from "@/examples/components/menu"
import { BlockProps } from "../blocks"
import { type FocusMap } from "../editorContent"
import { useBlockItem } from "@/examples/hooks/useBlockItem"
import { ISchema } from '@formily/react'

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
    blocks: any[],
    container: any
    widgetMap: any,
    blockItem?: BlockProps | {},
    schema:ISchema 
}

const EditorContext = createContext<EditorContextProps>({
    configs: {},
    theme: 'dark',
    language: 'zh_cn',
})

export const DataProvider = createContext<DataProviderProps>({
    blocks: [],
    container: {},
    widgetMap: {},
    blockItem: {},
    schema:{}
})


const Editor = (props: EditorProps) => {

    // 外部传入数据源
    const { widgetList, data } = props
    // 所有blocks
    const [blocks, setBlocks] = useState<any>(data.blocks || [])
    // drag相关
    const [collapse, setCollapse] = useState<boolean>(false)

    const canvasRef = useRef() as React.MutableRefObject<any>
    const [dragStart, dragEnd, dragItem] = useDragMenus(canvasRef,blocks,setBlocks)
    // container 属性
    const [container, setContainer] = useState<any>(data.container || {})
    // 选中时候是否是多个焦点
    const [isMulti, setIsMulti] = useState<boolean>(false)

    const [widgetMap] = useComponentMap(widgetList)
    // 当前获取焦点元素及其schema配置
    const [schema, blockItem] = useBlockItem(dragItem)
    // hooks
    useEffect(() => {

        // console.log(canvasRef)
    }, [])
    // 菜单拖拽

    // functions
    const changeCollapse = () => {
        setCollapse(!collapse)
    }
    const handleClick = () => {

    }

    const exploreFocus = (focusMap: Map<string, FocusMap>, isMulti: boolean) => {
        if (isMulti) {
            setIsMulti(isMulti)
        } else {
            // const schema
        }

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
                        (editorConfig) => (<>
                            <Nav handleClick={() => handleClick()} ></Nav>

                            <DataProvider.Provider value={{
                                blocks,
                                container,
                                widgetMap,
                                schema,
                            }}>
                                <ContainerPc>
                                    <DataProvider.Consumer>
                                        {
                                            (data) => (
                                                <>
                                                    <Menu onCollapse={() => changeCollapse()} items={widgetList} dragStart={(e: DragEvent, comp: any) => dragStart(e, comp)}></Menu>
                                                    <EditorContent
                                                        {...data}
                                                        {...editorConfig}
                                                        ref={canvasRef}
                                                        dragEnd={() => dragEnd()}
                                                        exploreFocus={(focusMap: Map<string, FocusMap>, isMulti: boolean) => exploreFocus(focusMap, isMulti)}
                                                    ></EditorContent>
                                                    <ConfigurationsContent schema={data.schema} isMulti={isMulti}></ConfigurationsContent>
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