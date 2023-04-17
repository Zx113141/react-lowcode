import { schema } from './schema';
import Text from '.'
export const text = {
    name: '普通文本',
    preview: () => <div>预览文本</div>,
    render: Text,
    key: 'text',
    schema
}