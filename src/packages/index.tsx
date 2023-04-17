import { textList } from "./widget/text/editor"
import React, { ReactElement } from "react"
import {formList} from './widget/form'
import { chartsList } from "./widget/charts"
// {
//     type: 'form',
//     key: 'text',
//     label: '文本',
//     children: [
//         {
//             ...text
//         }
//     ]
// },
export const componentsList = [
    {
        property: 'form',
        name: '表单组件',
        icon: () => <></>,
        lists: [...formList]
    },
    {
        property: 'charts',
        name: '图表组件',
        icon: () => <></>,
        lists: [
           ...chartsList
        ]
    },
    {
        property: 'text',
        name: '文字组件',
        icon: () => <></>,
        lists:[...textList]
    }
]