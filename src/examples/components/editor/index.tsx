
import ContainerPc from "./container"
import { useCallback, useMemo, useRef } from "react"
import Menu from '@/examples/components/menu'
import { useState } from 'react'
import EditorContent from "../editorContent"
import ConfigurationsContent from "../configuration"
import Nav from "@/examples/components/nav"
import { type Items } from "@/examples/components/menu"
import EngineProvider from '@/examples/Provider/Engine'
// import { createDragRef } from "@/examples/core"
import EditConfigProvier from '@/examples/Provider/Editor'
import DataProvider from "@/examples/Provider/Blocks"
import Blocks from '../blocks'
import data from '@/configs/data.json';

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


    // throw somethings from Engine/core
    return (
        <EditConfigProvier>
            <DataProvider widgetList={widgetList}>
                <Nav></Nav>
                <EngineProvider data={data} canvasRef={canvasRef}>
                    <ContainerPc
                        menu={
                            <Menu
                                onCollapse={() => changeCollapse()}
                                items={widgetList}
                            ></Menu>
                        }
                        blocks={<Blocks></Blocks>}
                        ref={canvasRef}
                        configure={
                            <ConfigurationsContent
                            // panel={() => <div></div>}
                            // onWatch={null}

                            ></ConfigurationsContent>
                        }
                    ></ContainerPc>

                </EngineProvider>
            </DataProvider>

        </EditConfigProvier>
    )
}

export default Editor