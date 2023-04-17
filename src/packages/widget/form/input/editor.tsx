import { schema } from './schema';
import XInput from '.'
export const input = {
    name: '普通输入框',
    preview: () => <div><XInput></XInput></div>,
    render: XInput,
    key: 'input'
}