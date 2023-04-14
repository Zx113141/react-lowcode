import Text from "./widget/text"
import React, {ReactElement} from "react"
import XButton from "./widget/button"
import XInput from "./widget/input"
export const componentsList = [
    {
        property:'form',
        name:'表单组件',
        icon:<></>,
        lists:[
            {
                type:'form',
                key:'text',
                preview:() => <div>预览文本</div>,
                render:Text,
                label:'文本'
            },
            {
                type:'form',
                key:'button',
                preview:() => <div><XButton></XButton></div>,
                render:XButton,
                label:'按钮'
            },
            {
                type:'form',
                key:'input',
                preview: () => <div><XInput></XInput></div>,
                render:XInput,
                label:'输入框'
            },
            {
                type:'form',
                key:'inputNumber',
                preview: () => <div>数字输入框</div>,
                render:() => <div>数字输入框</div>,
                label:'数字输入框'
            },
        ]
    }
]