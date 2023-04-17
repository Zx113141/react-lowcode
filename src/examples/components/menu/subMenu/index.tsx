import React, { ReactNode, useEffect, useState } from "react"
import styles from './index.module.less'
import classNames from 'classnames';
import { useMenu } from "../useMenu";
import { type Items } from '..'

interface SubMenuProps {
    items: Items[]
    dragStart: (e:DragEvent, comp:any) => void
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
    const {dragStart} = props
    const [activeKey, setActiveKey] = useState<string[]>([])
    const [activeList, setActiveList] = useState<any>([])
    const [activeSubs, setActiveSubs] = useState<any>([])
    const [list, menus] = useMenu(props.items)
    const onMenuClick = (e: any, key: string) => {
        const menu = menus.find(subMenu => subMenu.parent === key)
        setActiveSubs(menus.filter(menu => menu.parent === key))
        setActiveKey([key, menu?.key])
    }
    const onSubClick = (e:any, parent:string,key:string) => {
        setActiveKey([parent,key])
    }
    useEffect(() => {
        const block = menus.find(block => block.key===activeKey[1] && block.parent === activeKey[0])
        setActiveList(block?.children)
    }, [activeKey])
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
                        activeSubs.map(menu => (
                            <li key={menu.key} className={classNames(styles.subMenu, menu.key === activeKey[1] ? styles.active : '')} onClick={(e: any) => onSubClick(e, menu.parent,menu.key)}>
                                <div className={styles.name}>
                                    {menu.title}
                                </div>
                            </li>
                        ))
                    }
                </div>
                <div className={styles.subsComp}>
                    {
                        activeList?.map(comp => {
                            return (
                                <div className={styles.subsCompBlock} key={comp.key} draggable onDragStart={(e:DragEvent) => dragStart?dragStart(e, comp):null}>
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