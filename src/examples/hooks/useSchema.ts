import { ISchema } from "@formily/react"
import { type BlockProps } from "../components/blocks";
import { useState } from "react";

export const useSchema = (): [ISchema, (FocusMap: Map<string, BlockProps>) => void] => {
    const [schema, setSchema] = useState<ISchema>({})
    const getSchema = (focusMap: Map<string, BlockProps>) => {

        if (focusMap.size > 0) {
            if (focusMap.size > 1) {
                setSchema({})
            } else {
                setSchema(focusMap.values().next().value.schema)
            }
        } else {
            setSchema({})
        }

    }


    return [schema, getSchema]
}