import { ISchema } from "@formily/react"
import { type BlockProps } from "../components/blocks";
import { useState } from "react";

export const useSchema = (focus: Map<string, BlockProps>): [ISchema] => {
    let schema: ISchema = {}
    if (focus.size > 0) {
        if (focus.size > 1) {
            schema = {}
        } else {
            schema = (focus.values().next().value.schema)
        }
    } else {
        schema = {}
    }

    return [schema]
}