
import { SettingOutlined } from '@ant-design/icons';
import ColorPick from '../CustomForm/color';
import React, { useMemo, useState, useContext } from 'react'
import {
    FormLayout,
    FormItem,
    Input,
    FormCollapse,
    Switch
} from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Radio, Empty } from 'antd'
import { DataProvider } from '../../editor'
import { useSchema } from '@/examples/hooks/useSchema'


const Customized = () => {
    const focus = useContext(DataProvider).focus.focusInfo
    const [schema] = useSchema(focus)
    const SchemaField = useMemo(() => createSchemaField({
        components: {
            FormItem,
            FormCollapse,
            Input,
            Switch,
            ColorPick
        },
    }), [schema])
    const form = useMemo(() => createForm(), [])
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
                            <SchemaField schema={schema} scope={{ formCollapse,genExtra}} />
                        </FormLayout>
                    </FormProvider>
            }
        </>

    )
}

export default Customized