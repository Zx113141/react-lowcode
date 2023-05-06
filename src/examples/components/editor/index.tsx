
import ContainerPc from "./container"
import { useCallback, useMemo, useRef } from "react"
import Menu from '@/examples/components/menu'
import { useState } from 'react'
import EditorContent from "../editorContent"
import ConfigurationsContent from "../configuration"
import Nav from "@/examples/components/nav"
import { useDragMenus } from "@/examples/hooks/useDragMenus"
import { type Items } from "@/examples/components/menu"
import EngineProvider from '@/examples/Provider/Engine'
import { createDragRef } from "@/examples/core"
import EditConfigProvier from '@/examples/Provider/Editor'
import DataProvider from "@/examples/Provider/Blocks"

export interface EditorProps {
    widgetList: Items[],
    data: any
}



const Editor = (props: EditorProps) => {

    // 外部传入数据源
    const { widgetList, data } = props

    // 菜单相关
    const [collapse, setCollapse] = useState<boolean>(false)

    const canvasRef = useRef() as React.MutableRefObject<any>
    // functions
    const changeCollapse = useCallback(() => {
        setCollapse(!collapse)
    }, [collapse])

    const { dragStart, dragEnd } = useMemo(() => (
        createDragRef({
            canvasRef
        })
    ), [canvasRef])

    // throw dragStart
    return (
        <EditConfigProvier>
            <DataProvider widgetList={widgetList}>
                <Nav></Nav>
                <ContainerPc>
                    <EngineProvider data={data} >
                        <Menu
                            onCollapse={() => changeCollapse()}
                            items={widgetList}
                            dragStart={dragStart}
                        ></Menu>
                        <EditorContent
                            dragEnd={dragEnd}
                        ></EditorContent>
                        <ConfigurationsContent ></ConfigurationsContent>
                    </EngineProvider>
                </ContainerPc>
            </DataProvider>

        </EditConfigProvier>
    )
}

export default Editor