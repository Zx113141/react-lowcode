import React from "react";



export const useContainer = (defaultValue: any = {}):[any, (params: string, value: any) => void] => {
    const [container, setContainer] = React.useState<any>(defaultValue)
    const onContainerEdit = React.useCallback((params: string, value: any) => {
        let obj:any = {}
        obj[params] = value
        setContainer({
            ...container,
            ...obj,
        })
    },[container])
    return [container, onContainerEdit]
}