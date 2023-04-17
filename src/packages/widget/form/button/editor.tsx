import { schema } from './schema';
import XButton from '.'
export const button = {
    name: '普通按钮',
    preview: () => <div><XButton></XButton></div>,
    render: XButton,
    key: 'button'
}