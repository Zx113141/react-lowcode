import styles from './index.module.less'
import { ISchema } from '@formily/react'
import React, { useMemo, useState } from 'react'
import {
    FormLayout,
    FormItem,
    Input,
    FormCollapse
} from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Radio, Empty } from 'antd'

interface CusomizedProps {
    schema?: ISchema,
    initialValue?: any
}


const Customized = ({ schema = {}, initialValue }: CusomizedProps) => {
    console.log(schema)
    const SchemaField = useMemo(() => createSchemaField({
        components: {
            FormItem,
            FormCollapse,
            Input,
        },
    }), [schema])
    const form = useMemo(() => createForm(), [schema])
    const formCollapse = FormCollapse.createFormCollapse()


    return (
        <>
            {
                !schema ? <Empty ></Empty> :
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