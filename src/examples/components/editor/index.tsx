
import ContainerPc from "./container"
import { useCallback, useRef } from "react"
import Menu from '@/examples/components/menu'
import { useState } from 'react'
import EditorContent from "../editorContent"
import ConfigurationsContent from "../configuration"
import Nav from "@/examples/components/nav"
import { useDragMenus } from "@/examples/hooks/useDragMenus"
import { type Items } from "@/examples/components/menu"
import EngineProvider from '@/examples/Provider/Engine'
import EditConfigProvier from '@/examples/Provider/Editor'
import DataProvider from "@/examples/Provider/Blocks"
interface EditorProps {
    widgetList: Items[],
    data: any
}



const Editor = (props: EditorProps) => {

    // 外部传入数据源
    const { widgetList, data } = props

    // 菜单相关
    const [collapse, setCollapse] = useState<boolean>(false)

    const canvasRef = useRef() as React.MutableRefObject<any>
    // 负责菜单拖拽 和 放置事件
    const [dragStart, dragEnd, block] = useDragMenus(canvasRef)
    // functions
    const changeCollapse = useCallback(() => {
        setCollapse(!collapse)
    }, [collapse])
    return (
        <EditConfigProvier>
            <DataProvider widgetList={widgetList}>
                <Nav></Nav>
                <ContainerPc>
                    <EngineProvider canvasRef={canvasRef}>
                        <Menu
                            onCollapse={() => changeCollapse()}
                            items={widgetList}
                        ></Menu>
                        <EditorContent
                            data={data}
                            ref={canvasRef}
                        ></EditorContent>
                        <ConfigurationsContent ></ConfigurationsContent>
                    </EngineProvider>
                </ContainerPc>
            </DataProvider>

        </EditConfigProvier>
    )
}

export default Editor