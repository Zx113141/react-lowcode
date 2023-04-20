import { Dropdown, Button } from 'antd'
export interface Roles {
    key: string,
    name: string | JSX.Element,
    info?: string,
    execute?: (key: string) => (params: any) => void
}

export const langItems = [
    {
        key: '1',
        label: (
            <p>
                中文
            </p>
        ),
    },
    {
        key: '2',
        label: (
            <p>
                English
            </p>
        ),
    },
]

export const themeItems = [
    {
        key: 'dark',
        label: (
            <p>
                暗色
            </p>
        ),
    },
    {
        key: 'light',
        label: (
            <p>
                亮色
            </p>
        ),
    },
]
export const rolesLeft: Roles[] = [
    {
        key: 'home',
        name: '主页',
        info: '返回主页',
        execute: (key: string) => function (key: string) { }
    },
    {
        key: 'chart',
        name: '图表',
        info: '图表组件',
        execute: (key: string) => function (key: string) { }
    },
    {
        key: 'layout',
        name: '图层',
        info: '图层控制',
        execute: (key: string) => function (key: string) { }
    },
    {
        key: 'options',
        name: '配置',
        info: '配置设置',
        execute: (key: string) => function (key: string) { }
    },
    {
        key: 'setting',
        name: '基本设置',
        info: '设置',
        execute: (key: string) => function (key: string) { }
    },
    {
        key: 'null',
        name: '|',
        execute: (key: string) => function (key: string) { }
    },
    {
        key: 'left',
        name: '<',
        info: '前进',
        execute: (key: string) => function (key: string) { }
    },
    {
        key: 'right',
        name: '>',
        info: '撤回',
        execute: (key: string) => function (key: string) { }
    },
]

export const rolesRight: Roles[] = [
    {
        key: 'preview',
        name: '预览',
        execute: (key: string) => function () { },
    },
    {
        key: 'release',
        name: '发布',
        execute: (key: string) => function () { }
    },
    {
        key: 'lang',
        name: <Dropdown menu={{ items: langItems }} placement="bottomLeft">
                <span>
            Text
            </span>
        </Dropdown>,
        execute: (key: string) => function () { }
    },

    {
        key: 'theme',
        name: <Dropdown menu={{ items: themeItems }} placement="bottomLeft">
            <span>
            theme
            </span>
        </Dropdown>,
    },
    {
        key: 'colors',
        name: '颜色',
        execute: (key: string) => function openColorPickModel(fn: React.Dispatch<boolean>) {
            fn(true)
        }
    },
    {
        key: 'avatar',
        name: <img width='30px' height='100%'></img>,
        execute: (key: string) => function () { }
    },
]
