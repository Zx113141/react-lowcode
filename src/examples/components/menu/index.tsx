
import React, { ReactDOM, createContext } from "react"
import { Input } from "antd";
import SubMenu from "./subMenu"
import { useEffect } from 'react';
import styles from './index.module.less'
export interface MenuProps {
    isCollapse?: boolean
    items: Items[]
    style?: React.CSSProperties
    theme?: string,
    onCollapse?: () => void
    dragStart?: (e:DragEvent, comp:any) => void
}
export interface Items {
    property: string,
    lists: ComponentsListProps[],
    icon: () => JSX.Element,
    name: string,

}
export interface ComponentsListProps {
    type: string
    key: string
    preview: () => JSX.Element,
    render: () => JSX.Element,
    label: string
    children:ComponentsListProps[]
}

export const MenuContext = createContext<MenuProps>({
    isCollapse: false,
    onCollapse: () => { },
    style: {},
    theme: 'dark',
    items:[]
})
const Menu = (props: any) => {
    return (
        <MenuContext.Provider value={{ ...props }}>
            {props.children}
        </MenuContext.Provider>
    )
}
const MenuProvider =React.memo((props: MenuProps) => {
console.log('Menu 渲染了')
    return (
        <Menu {...props}>
            <div className={styles.menu}>
                <div className={styles.menuSearch} >
                    <div style={{ textAlign: 'left', paddingLeft: 12 }}>
                        组件
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Input size="small" style={{ width: 100 }}></Input>
                        <span>

                            doSomething
                        </span>
                    </div>
                </div>
                <MenuContext.Consumer>
                    {
                        (ctx) => (
                            <SubMenu  {...ctx}>
                            </SubMenu>
                        )
                    }
                </MenuContext.Consumer>

            </div>


        </Menu>

    )

})

export default MenuProvider

