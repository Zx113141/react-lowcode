import Nav from "../../hooks/nav"
import styles from './index.module.less'

interface EditorProps {
    children: React.ReactNode,
}

const ContainerPc = (props: EditorProps) => {
    const { children } = props
    console.log('ContainerPc 渲染了')
    return (
        <div className={styles.container}>
            {
                children
            }
            
        </div>
    )
}

export default ContainerPc