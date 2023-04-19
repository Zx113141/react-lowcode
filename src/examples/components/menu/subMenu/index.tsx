import React, { ReactNode, useEffect, useState } from "react"
import styles from './index.module.less'
import classNames from 'classnames';
import { useMenu } from "../useMenu";
import { type Items } from '..'

interface SubMenuProps {
    items: Items[]
    dragStart: (e: React.DragEventHandler<HTMLDivElement>, comp: any) => void
}
export interface SubMenu {
    icon?: () => JSX.Element,
    key: string
    title?: string
    children?: SubMenu[]
    parent?: string,
    render?: () => JSX.Element,
}
const SubMenu = (props: SubMenuProps) => {
    console.log('Menu 渲染了')
    const { dragStart } = props
    // 激活菜单
    const [activeKey, setActiveKey] = useState<any[]>([])
    // 组件页
    const [activeList, setActiveList] = useState<any>([])
    // 子菜单
    const [activeSubs, setActiveSubs] = useState<any>([])
    const [list, menus] = useMenu(props.items)
    const onMenuClick = (e: any, key: string) => {
        const menu = menus.find(subMenu => subMenu.parent === key)
        const block = menus.find(subMenu => subMenu.parent === key)
        if (!activeKey.length || activeKey[0] !== key) {
            setActiveSubs(menus.filter(menu => menu.parent === key))
            setActiveKey([key, menu?.key])
            setActiveList(block?.children)
        }

    }
    const onSubClick = (e: any, parent: string, key: string) => {
        if (activeKey[1] !== key) {
            const block = menus.find(subMenu => subMenu.key === key && subMenu.parent === parent)
            setActiveKey([parent, key])
            setActiveList(block?.children)
        }
    }


    // console.log('SubMenu 渲染了')
    return (
        <div className={styles.subs}>
            <ul>
                {
                    list.map(li => {
                        return (
                            <li key={li.key} className={classNames(styles.subMenu, li.key === activeKey[0] ? styles.active : '')} onClick={(e: any) => onMenuClick(e, li.key)}>
                                <div className={styles.subsIcon}>
                                    {li.icon && li.icon()}
                                </div>
                                <div className={styles.name}>
                                    {li.title}
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            <ul className={styles.subsChild}>
                <div className={styles.subsChildMenu}>
                    {
                        activeSubs.map((menu: any) => (
                            <li key={menu.key} className={classNames(styles.subMenu, menu.key === activeKey[1] ? styles.active : '')} onClick={(e: any) => onSubClick(e, menu.parent, menu.key)}>
                                <div className={styles.name}>
                                    {menu.title}
                                </div>
                            </li>
                        ))
                    }
                </div>
                <div className={styles.subsComp}>
                    {
                        activeList?.map((comp: any) => {
                            return (
                                <div className={styles.subsCompBlock} key={comp.key} draggable onDragStart={(e: React.DragEventHandler<HTMLDivElement>) => dragStart(e, comp) }>
                                    <div className={styles.subsCompBlockTitle}>
                                        {
                                            comp.name
                                        }
                                    </div>
                                    <div className={styles.subsCompBlockIcon}>
                                        {comp.preview && comp.preview()}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </ul>
        </div>
    )
}

export default SubMenu