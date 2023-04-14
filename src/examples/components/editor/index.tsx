
import ContainerPc from "./container"
import { useEffect } from "react"
import Menu from '@/examples/components/menu'
import { useState, createContext } from 'react'
import EditorContent from "../editorContent"
import ConfigurationsContent from "../configuration"
import Nav from "../nav"
import { type Items } from "@/examples/components/menu"


interface EditorProps {
    widgetList: Items[]
}

interface EditorContextProps {
    theme?: string,
    menuCollapse?: boolean
    language?: string
}


const EditorContext = createContext<EditorContextProps>({
    menuCollapse: false
})

const TreeNode = createContext<any>({

})

const Editor = (props: EditorProps) => {
    // var
    const [collapse, setCollapse] = useState<boolean>(false)
    const { widgetList } = props
    // hooks
    useEffect(() => {

    }, [])
    // functions
    const changeCollapse = () => {
        setCollapse(!collapse)
    }
    const handleClick = () => {

    }
    return (
        <>
            <EditorContext.Provider value={{
                menuCollapse: collapse
            }}>
                <Nav handleClick={() => handleClick()}></Nav>
                <ContainerPc>
                    <Menu onCollapse={() => changeCollapse()} items={widgetList}></Menu>
                    <EditorContent></EditorContent>
                    <ConfigurationsContent></ConfigurationsContent>
                </ContainerPc>
                {/* <TreeNode.Provider>

                </TreeNode.Provider> */}

            </EditorContext.Provider>
        </>
    )
}

export default Editor