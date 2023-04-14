import { componentsList } from "@/packages";

export const useComponents = (data: any) => {
    let widgetMap: any = {}
    let widgetList: any = []
    data.forEach(it => {
        let comp = componentsList.find(comp => comp.type == it.type)
        if (comp) {
            widgetMap[comp.type] = comp
            widgetList.push({
                ...comp,
                ...it
            })
        }
    })

    return {
        widgetList,
        widgetMap,
        componentsList
    }
}