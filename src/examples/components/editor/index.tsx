
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
    data: any,
    dragStart?: (e:DragEvent, comp:any) => void,
    dragEnd?: () => void,
    widgetMap:any,
}

const EditorContext = createContext<EditorContextProps>({
    configs: {},
    theme: 'dark',
    language: 'zh_cn',
})

export const DataProvider = createContext<DataProviderProps>({
    data: {},
    widgetMap:{},
})

const TreeNode = createContext<any>({

})

const Editor = (props: EditorProps) => {
    // var
    const [collapse, setCollapse] = useState<boolean>(false)

    const canvasRef = useRef() as React.MutableRefObject<any>
    const [dragStart, dragEnd] = useDragMenus(canvasRef)
    const { widgetList, data } = props
    const [widgetMap] = useComponentMap(widgetList)
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
                                data,
                                dragStart,
                                dragEnd,
                                widgetMap,
                            }}>
                                <ContainerPc>
                                    <DataProvider.Consumer>
                                        {
                                            (data) => (
                                                <>
                                                    <Menu onCollapse={() => changeCollapse()} items={widgetList} dragStart={(e: DragEvent, comp: any) => dragStart(e, comp)}></Menu>
                                                    <EditorContent {...data} {...editorConfig} widgetMap={widgetMap} ref={canvasRef} dragEnd={() => dragEnd()}></EditorContent>
                                                    <ConfigurationsContent isGroup={false}></ConfigurationsContent>
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