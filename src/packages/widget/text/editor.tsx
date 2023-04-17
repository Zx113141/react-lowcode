import { schema } from './schema';
import Text from '.'

export const textList = [
    {
        type: 'text',
        key: 'normalText',
        label: '普通文本',
        children: [
            {
                name: '普通文本',
                preview: () => <div>预览文本</div>,
                render: Text,
                key: 'text',
                schema
            }
        ]
    },
]