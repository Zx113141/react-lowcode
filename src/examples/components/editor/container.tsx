import Nav from "../nav"
import styles from './index.module.less'

interface EditorProps {
    children: React.ReactNode,
}

const ContainerPc = (props: EditorProps) => {
    const { children } = props

    return (
        <div className={styles.container}>
            {
                children
            }
            
        </div>
    )
}

export default ContainerPc