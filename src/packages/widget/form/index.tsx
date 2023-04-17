// import { schema } from './schema';
import { button } from './button/editor'
import {input} from './input/editor'

export const formList = [
    {
        type: 'form',
        key: 'button',
        label: '按钮',
        children: [
            button
        ]
    },
    {
        type: 'form',
        key: 'input',
        label: '输入框',
        children: [
            input
        ]
    }
]
