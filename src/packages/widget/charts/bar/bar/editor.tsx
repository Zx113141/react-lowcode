import Bar from ".";
import { barPropertySchema } from './schema'


export const bar = {
    name: '普通柱状图',
    preview: () => <Bar></Bar>,
    render: Bar,
    key: 'bar',
    schema:barPropertySchema
}