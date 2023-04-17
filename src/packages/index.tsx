import {text} from "./widget/text/editor"
import React, { ReactElement } from "react"
import XButton from "./widget/button"
import XInput from "./widget/input"
export const componentsList = [
    {
        property: 'form',
        name: '表单组件',
        icon: () => <></>,
        lists: [
            {
                type: 'form',
                key: 'text',
                label: '文本',
                children: [
                    {
                       ...text
                    }
                ]
            },
            {
                type: 'form',
                key: 'button',
                label: '按钮',
                children: [
                    {
                        name: '普通按钮',
                        preview: () => <div><XButton></XButton></div>,
                        render: XButton,
                        key:'button'
                    }
                ]
            },
            {
                type: 'form',
                key: 'input',
                label: '输入框',
                children: [
                    {
                        name: '普通输入框',
                        preview: () => <div><XInput></XInput></div>,
                        render: XInput,
                        key:'input'
                    }
                ]
            },
            {
                type: 'form',
                key: 'inputNumber',
                label: '数字输入框',
                children: [
                    {
                        name: '普通数字输入框',
                        preview: () => <div>数字输入框</div>,
                        render: () => <div>数字输入框</div>,
                        key:'inputNumber'
                    }
                ]
            },
        ]
    }
]