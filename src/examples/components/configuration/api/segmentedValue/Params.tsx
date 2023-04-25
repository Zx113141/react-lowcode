import { MinusCircleOutlined, PlusOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space, Tag } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;

const areas = [
    { label: 'Beijing', value: 'Beijing' },
    { label: 'Shanghai', value: 'Shanghai' },
];

const sights = {
    Beijing: ['Tiananmen', 'Great Wall'],
    Shanghai: ['Oriental Pearl', 'The Bund'],
};

type SightsKeys = keyof typeof sights;
export interface ParamsProps {
    validateIndex:number []
}
const Params = (props:ParamsProps) => {
    const {validateIndex} = props
    const form = Form.useFormInstance();


    return (
        <Form.List name="keys" >
            {(fields, { add, remove }) => (
                <>
                    {fields.map((field, index) => (
                        <Space key={field.key} align="baseline">
                            <Form.Item
                                noStyle
                                shouldUpdate={(prevValues, curValues) =>
                                    prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                                }
                            >
                                {() => (
                                    <Form.Item
                                        {...field}
                                        label="Key"
                                        name={[field.name, 'key']}
                                    >
                                        <Input />
                                    </Form.Item>
                                )}
                            </Form.Item>
                            <Form.Item
                                {...field}
                                label="Value"
                                name={[field.name, 'value']}
                            >
                                <Input />
                            </Form.Item>
                            <span>校验结果：</span>
                            {
                                validateIndex.find(ind => ind == index + 1) ?
                                    <Tag icon={<CheckCircleOutlined />} color="success">
                                        success
                                    </Tag> :
                                    <Tag icon={<CloseCircleOutlined />} color="error">
                                        error
                                    </Tag>
                            }


                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                        </Space>
                    ))}

                    <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Add Key-Value
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form.List>
    );
};

export default Params;