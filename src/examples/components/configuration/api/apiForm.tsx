import { Button, Form, Input, Select, Segmented, } from 'antd';
import React, { useState } from 'react';
const { Option } = Select;
import { KeepAlive } from 'react-activation'
import Params from './segmentedValue/Params';
import BodyParams from './segmentedValue/Body';
const getFormBySegmentedValue = (value: string | number, validateIndex: any) => {
    let Component: JSX.Element | null = null
    // console.log(Component.name)
    // 'Params', 'Header', 'Body','Tokens'
    switch (value) {
        case 'Params':
            Component = <Params validateIndex={validateIndex}></Params>
            break;
        case 'Header':
            Component = <Params validateIndex={validateIndex}></Params>
            break;
        case 'Body':
            Component = <BodyParams validateIndex={validateIndex}></BodyParams>
            break;
        case 'Tokens':
            Component = <Input.TextArea maxLength={200}></Input.TextArea>
            break;

    }
    // console.log(Component.name)
    return (
        Component && Component
    )
}

const ApiForm = () => {
    const [segmentedValue, setSegmentedValue] = useState<string | number>('Params')
    const [validateIndex, setValidateIndex] = useState<number[]>([])
    const [form] = Form.useForm();
    const options = [
        {
            label: 'GET',
            value: 'GET',
        },
        {
            label: 'POST',
            value: 'POST',
        },
        {
            label: 'PUT',
            value: 'PUT',
        },
        {
            label: 'OPTIONS',
            value: 'OPTIONS',
        }
    ]
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    const handleValidate = (changedValues: any, values: any) => {
        let arr: number[] = []
        values.keys.forEach((item: { key?: string, value?: string }, index: number) => {
            if (item && Object.keys(item).length === 2 && item.key?.trim() && item.value?.trim()) {
                arr.push(index + 1)
            }
        })
        setValidateIndex(arr)
    }
    return (
        <Form name="complex-form"
            onFinish={onFinish}
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            form={form}
            onValuesChange={(changedValues: any, values: any) => handleValidate(changedValues, values)}
        >
            <Form.Item label="接口信息">
                <Input.Group compact>
                    <Form.Item
                        name={['request', 'method']}
                        noStyle
                        rules={[{ required: true, message: 'Method is required' }]}
                    >
                        <Select placeholder="Select Method" style={{ width: '20%' }}>
                            {
                                options.map((it) => {
                                    return <Option value={it.value} key={it.value}>{it.label}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={['request', 'url']}
                        noStyle
                        rules={[{ required: true, message: 'url is required' }]}
                    >
                        <Input style={{ width: '80%' }} placeholder="Input url here" />
                    </Form.Item>
                </Input.Group>
            </Form.Item>
            <Form.Item label="选择方式">
                <Segmented options={['Params', 'Header', 'Body', 'Tokens']}
                    block
                    onChange={(value: string | number) => setSegmentedValue(value)}
                    defaultValue={segmentedValue}
                />

            </Form.Item>
            <Form.Item
                label=" " colon={false}
            >
                {
                    getFormBySegmentedValue(segmentedValue, validateIndex)
                }
            </Form.Item>
            <Form.Item label=" " colon={false}>
                <Button type="primary" htmlType="submit">
                    Add To The Api
                </Button>
            </Form.Item>
        </Form>


    )
}

export default ApiForm