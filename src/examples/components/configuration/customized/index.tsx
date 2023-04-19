import styles from './index.module.less'
import { ISchema } from '@formily/react'
import React, { useMemo, useState, useContext } from 'react'
import {
    FormLayout,
    FormItem,
    Input,
    FormCollapse
} from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Radio, Empty } from 'antd'
import { BlockProps } from '../../blocks'
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
        },
    }), [schema])
    const form = useMemo(() => createForm(), [])
    const formCollapse = FormCollapse.createFormCollapse()
    return (
        <>
            {
                JSON.stringify(schema) == '{}' ? <Empty ></Empty> :
                    <FormProvider form={form}>
                        <FormLayout labelCol={6} wrapperCol={10}>
                            <SchemaField schema={schema} scope={{ formCollapse }} />
                        </FormLayout>
                    </FormProvider>
            }
        </>

    )
}

export default Customized