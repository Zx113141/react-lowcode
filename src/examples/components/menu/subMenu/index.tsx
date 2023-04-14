import React, { ReactNode, useState } from "react"
import styles from './index.module.less'
import classNames from 'classnames';
import { useMenu } from "../useMenu";
import { type Items } from '..'

interface SubMenuProps {
    children: ReactNode,
    items: Items[]
}
export interface SubMenu {
    icon: () => JSX.Element,
    key: string
    title?: string
    children?: SubMenu[]
    parent?: string,
    render: () => JSX.Element,
}
const SubMenu = (props: SubMenuProps) => {
    const [activeKey, setActiveKey] = useState('chart')
    const [list, menus] = useMenu(props.items)
    const onSubClick = (e: any, key: string) => {
        setActiveKey(key)
    }

    return (
        <div className={styles.subs}>
            <ul>
                {
                    list.map(li => {
                        return (
                            <li key={li.key} className={classNames(styles.subMenu, li.key === activeKey ? styles.active : '')} onClick={(e: any) => onSubClick(e, li.key)}>
                                <div className={styles.subsIcon}>
                                    {li.icon}
                                </div>
                                <div className={styles.name}>
                                    {li.title}
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            <ul>
                {
                    menus.map(menu => (
                        <li key={menu.key} className={classNames(styles.subMenu, menu.key === activeKey ? styles.active : '')} onClick={(e: any) => onSubClick(e, menu.key)}>
                            <div className={styles.name}>
                                {menu.title}
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default SubMenu