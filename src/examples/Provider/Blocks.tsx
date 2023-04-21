import { observer, useLocalObservable } from "mobx-react-lite";
import React, { createContext } from "react";
import { useComponentMap } from "../hooks/useComponentMap";

export interface DataProviderProps {
    widgetMap: any,
}
export const DataContext = createContext<DataProviderProps>({
    widgetMap: {},
})
interface DataProviderContextProps {
    children: React.ReactNode,
    widgetList: any,
}
const DataProvider = observer((props: DataProviderContextProps) => {
    // 获取选中foucusMap
    const DataContextStore = useLocalObservable(() => {
        const [widgetMap] = useComponentMap(props.widgetList)
        return {
            widgetMap,
        }
    })
    return <DataContext.Provider value={DataContextStore}>
        {props.children}

    </DataContext.Provider>
})

export default DataProvider