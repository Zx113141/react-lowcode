import { useMenu } from "../components/menu/useMenu"

export const useComponentMap = (componentList:any[], ) => {
    const widgetMap:any = {}

    const [,items] = useMenu(componentList)
 
    items.forEach((item) => {
        if (item.children) {
            item.children.forEach(child => {
                widgetMap[child.key] = child
            })
        }
    })
    return [widgetMap]
}