import { EngineContext, Engine } from "@/examples/Provider/Engine"
import { Select, Timeline, Table, Tag } from "antd"
import type { ColumnsType } from 'antd/es/table';
import { useCallback, useContext, useState } from "react"
import styles from './index.module.less'
import { apiDataSelect } from "@/configs/apiConifg"
import { SmileOutlined } from '@ant-design/icons';
interface DataType {
    key: string;
    name: string;
    keyMap:any;
    // tags: any;
    isMatch:boolean;
}
const DataApis = () => {
    const { focus, blocks } = useContext<Engine>(EngineContext)
    const focusItem = focus.focusInfo.values().next().value
    const [dataType, setDataType] = useState<string>()

    const handleChange = (e: string) => {
        setDataType(e)
    }
    const columns: ColumnsType<DataType> = [
        {
            title: '字段名称',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: '字段映射',
            dataIndex: 'keyMap',
            key: 'keyMap',
        },
        {
            title: '状态',
            dataIndex: 'isMatch',
            key: 'isMatch',
            render:(value, record) => {
                return <Tag color={value?'success':'warning'}>{value?'匹配成功':'匹配出错'}</Tag>
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div>
                    <a>编辑</a>
                </div>
            ),
        },
    ];

    const data: DataType[] = [
        {
            key:'1',
            keyMap:'data1',
            name:'横坐标1',
            isMatch:true
        },
        {
            key:'2',
            keyMap:'data2',
            name:'横坐标2',
            isMatch:false
        }
    ];
    return (
        <div className={styles.api}>
            <div className={styles.apiContent}>
                <span >
                    数据来源
                </span>
                <Select
                    defaultValue={dataType}
                    style={{ width: 250 }}
                    onChange={handleChange}
                    options={apiDataSelect}
                />
            </div>
            <Timeline>
                <Timeline.Item>
                    <p>
                        数据映射
                    </p>
                    <Table columns={columns} dataSource={data} size="small"/>
                </Timeline.Item>
                <Timeline.Item color="gray">
                    数据内容
                </Timeline.Item>
                <Timeline.Item color="#00CCFF" dot={<SmileOutlined />}>
                    配置完成
                </Timeline.Item>
            </Timeline>
        </div>
    )
}

export default DataApis