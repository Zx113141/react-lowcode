import { type SubMenu,  } from '@/examples/components/menu/subMenu'
import React, { ReactDOM, ReactElement } from 'react'
export interface useMenuProps {
    property: string,
    lists: ComponentsListProps[],
    icon: () => JSX.Element,
    name: string
}

interface ComponentsListProps {
    type: string
    key: string
    preview: () => JSX.Element,
    render: () => JSX.Element,
    label: string
}

export const useMenu = (params: useMenuProps[]) => {
    const subs: SubMenu[] = []
    const items: SubMenu[] = []
    params.forEach((sub: useMenuProps) => {
        sub.lists.forEach((item: ComponentsListProps) => {
            items.push({
                icon: item.preview,
                title: item.label,
                key: item.key,
                parent: item.type,
                render: item.render
            })
        })
        subs.push({
            icon: sub.icon,
            title: sub.name,
            key: sub.property,
        })

    })
    return [subs,items]
}