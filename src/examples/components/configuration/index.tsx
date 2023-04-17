import styles from './index.module.less'
import { ISchema } from '@formily/react'
import React, { useMemo } from 'react'
import { useMergeSchema } from '@/examples/hooks/useMergeSchema'
import { tabsSchema } from './schema'
import {
    FormTab,
    FormItem,
    Input,
} from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
interface ConfigurationProps {
    schema: ISchema
}


const ConfigurationsContent = (props: ConfigurationProps) => {
    const { schema } = props
    const [mergeSchema] = useMergeSchema(schema, tabsSchema)
    const SchemaField = useMemo(() => createSchemaField({
        components: {
            FormItem,
            FormTab,
            Input,
        },
    }), [mergeSchema])
    const form = useMemo(() => createForm(), [mergeSchema])
    const formTab = FormTab.createFormTab()


    return (
        <div className={styles.configure}>
            <FormProvider form={form}>
                <SchemaField schema={tabsSchema} scope={{ formTab }} />
            </FormProvider>
        </div>
    )
}

export default ConfigurationsContent