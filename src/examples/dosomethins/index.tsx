
import {
    Observer,
    useLocalStore,
    observer
} from 'mobx-react-lite'
import { createContext } from 'react'
import { EditorContextProps } from '../components/editor'

interface EditConfigProvier {
    children: React.ReactNode
}


const EditConfigContext = createContext<EditorContextProps | null>(null)

const EditConfigProvier = observer((props: EditConfigProvier) => {
    const EditorStore: EditorContextProps = useLocalStore(() => {
        return {
            language: 'zh_cn',
            theme: 'dark',
            configs: {
                colors: null
            },
            setColors: (color) => {
                if (color) {
                    EditorStore.configs.colors = color
                }
            }
        }
    })
    return <EditConfigContext.Provider value={EditorStore}>
        {props.children}
    </EditConfigContext.Provider>
})

export default observer(EditConfigProvier)