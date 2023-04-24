
import { SettingOutlined } from '@ant-design/icons';
import ColorPick from '../CustomForm/color';
import React, { useMemo, useState, useContext } from 'react'
import { observer } from 'mobx-react-lite';
import {
    FormLayout,
    FormItem,
    Input,
    FormCollapse,
    Switch
} from '@formily/antd'
import { createForm, onFormValuesChange } from '@formily/core'
import { FormProvider, createSchemaField, } from '@formily/react'
import { Form } from '@formily/core';
import { Empty } from 'antd'
import { EngineContext, Engine } from '@/examples/Provider/Engine';
import { useSchema } from '@/examples/hooks/useSchema'


const Customized = () => {
    const {focus,property}= useContext<Engine>(EngineContext)
    const [schema] = useSchema(focus.focusInfo)
    const SchemaField = useMemo(() => createSchemaField({
        components: {
            FormItem,
            FormCollapse,
            Input,
            Switch,
            ColorPick
        },
    }), [schema])
    const form = useMemo(() => createForm({
        initialValues: {

        },
        effects() {
            onFormValuesChange((form: Form) => {
                property.setProperty(form.values,focus.focusInfo)
            })
        },
    }), [])
    const formCollapse = FormCollapse.createFormCollapse()
    const genExtra = () => (
        <SettingOutlined
            onClick={event => {
                // If you don't want click extra trigger collapse, you can prevent this:
                event.stopPropagation();
            }}
        />
    );
    return (
        <>
            {
                JSON.stringify(schema) == '{}' ? <Empty ></Empty> :
                    <FormProvider form={form}>
                        <FormLayout labelCol={6} wrapperCol={10}>
                            <SchemaField schema={schema} scope={{ formCollapse, genExtra }} />
                        </FormLayout>
                    </FormProvider>
            }
        </>

    )
}

export default observer(Customized)