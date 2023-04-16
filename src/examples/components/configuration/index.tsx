import styles from './index.module.less'
import { ISchema } from '@formily/react'
interface ConfigurationProps {
    isMulti:boolean,
    schema:ISchema
}

const ConfigurationsContent = (props:ConfigurationProps) => {


    return (
        <div className={styles.configure}>
            
        </div>
    )
}

export default ConfigurationsContent