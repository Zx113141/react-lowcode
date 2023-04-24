import styles from './index.module.less'
import Customized from './customized'
import Animations from './animation'
import DataApis from './api'
import Events from './events'
import {useMemo, useEffect } from 'react'
import { Tabs } from 'antd'


const ConfigurationsContent = () => {

    // const [Comp, setComp] = useState<JSX.Element>(<Customized schema={schema} initialValue={style}></Customized>)
    const checkLists = useMemo(() => (
        [
            {
                label: '定制化',
                key: 'custom',
                children: <Customized ></Customized>
            },
            {
                label: '数据格式',
                key: 'datas',
                children: <DataApis ></DataApis>
            },
            {
                label: '动画效果',
                key: 'animate',
                children: <Animations></Animations>
            },
            {
                label: '事件绑定',
                key: 'event',
                children: <Events ></Events>
            }
        ]
    ), [])
    const toogleComp = (activeKey:string) => {
    }
    useEffect(() => {

    }, [])

    return (
        <div className={styles.configure}>
            <div className={styles.configureRadio}>
                <Tabs
                    // tabPosition={tabPosition}
                    onChange={(activeKey) => toogleComp(activeKey)}
                    items={checkLists}
                />
            </div>
        </div>
    )
}

export default ConfigurationsContent