import styles from './index.module.less'
import Customized from './customized'
import Animations from './animation'
import DataApis from './api'
import Events from './events'
import { useState, createContext } from 'react'
import { Radio } from 'antd'
import { ISchema } from '@formily/react'
interface ConfigurationProps {
    schema?: ISchema
    style?:React.CSSProperties,
    animation?:any,
    action?:any,
    events?:any
}

const ConfigurationsContent = (props: ConfigurationProps) => {

    const [Comp, setComp] = useState<JSX.Element>(<Customized {...props}></Customized>)
    const checkLists = [
        {
            label: '定制',
            value: 'custom',
            Comp: Customized
        },
        {
            label: '数据',
            value: 'datas',
            Comp: DataApis
        },
        {
            label: '动画',
            value: 'animate',
            Comp: Animations
        },
        {
            label: '事件',
            value: 'event',
            Comp: Events
        }
    ]
    const toogleComp = (Comp:JSX.Element) => {
        setComp(<Comp {...props}></Comp>)
    }
 
    return (
        <div className={styles.configure}>
            <div className={styles.configureRadio}>
                <Radio.Group defaultValue="custom" buttonStyle="solid">
                    {
                        checkLists.map(checked => {
                            return (
                                <Radio.Button value={checked.value} onChange={() => toogleComp(checked.Comp)} key={checked.value}>定制</Radio.Button>
                            )
                        })
                    }
                </Radio.Group>
            </div>
            <div className={styles.configureForm}>
                    {
                        Comp
                    }
            </div>
        </div>
    )
}

export default ConfigurationsContent