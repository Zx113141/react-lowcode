import React, { useState } from "react";
import { Modal, Descriptions, Button, Table } from "antd";
import styles from './apis.module.less'
import type { ColumnsType } from 'antd/es/table';


interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}
const Apis = () => {
    const [onEdit, setOnEdit] = useState<boolean>(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);
    const beforeHandlConfirm = () => {
        return new Promise((res, rej) => {
            return res
        })

    }
    const handleComfirm = () => {
        
    }
    const handleCancel = () => {
        setOnEdit(false)
    }
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    return (
        <div className={styles.dynamic}>
            <Descriptions title="动态接口配置" size='small' extra={<Button type="primary" size="small" onClick={() => setOnEdit(true)}>编辑</Button>}>
                <Descriptions.Item label="请求配置" span={4}>请求方式 GET</Descriptions.Item>
                <Descriptions.Item label="PARAMS" span={4}>$60.00</Descriptions.Item>
                <Descriptions.Item label="目的地址" span={4}>https://gitee.com/zx1313/react-ts-vite.git</Descriptions.Item>
                <Descriptions.Item label="TOKENS" span={4}>d84f2462ecf3535a76e113f9b181d3e892b33348af2d2b0dababf875bbda880e</Descriptions.Item>
                <Descriptions.Item label="是否轮询" span={2}>是/否</Descriptions.Item>
                <Descriptions.Item label="轮询间隔" span={2}>30秒</Descriptions.Item>
                <Descriptions.Item label="是否代理" span={4}>是/否</Descriptions.Item>
                <Descriptions.Item label="代理地址" span={4}>https://gitee.com/zx1313/react-ts-vite.git</Descriptions.Item>
            </Descriptions>
            <Modal
                title="接口信息编辑"
                open={onEdit}
                onOk={beforeHandlConfirm}
                onCancel={handleCancel}
                okText="确认"
                cancelText="取消"
                width={1400}
            >
                <div style={{ height: 600 }}>

                </div>
                
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
            </Modal>
        </div>
    )
}

export default Apis