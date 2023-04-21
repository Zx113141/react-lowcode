
import {
    Observer,
    useLocalObservable,
    observer
} from 'mobx-react-lite'
import { createContext } from 'react'

export interface EditorContextProps {
    theme?: 'dark' | 'light',
    language?: string,
    configs: Configs,
    setColors: (newColors: Color) => void
    setTheme: (key: string) => void
    setLanguage: (key: any) => void
}


interface Configs {
    colors: Color | null,
    redo?: any[],
    undo?: any[],
    layout?: boolean,
    charts?: boolean,
    settings?: any
}
export interface Color {
    title: string,
    rgb: string,
    hexColor: string,
    pinyin: string,
    key: string
}

interface EditConfigProvierProps {
    children: React.ReactNode
}


export const EditConfigContext = createContext<EditorContextProps>({
    language: 'zh_cn',
    theme: 'dark',
    configs: {
        colors: {
            title: '碧空绿',
            hexColor: '#51d6a9',
            rgb: 'rgb(81, 214, 169)',
            pinyin: 'BI KONG LV',
            key: 'BIKONGLV'
        }
    },
    setColors: (color: Color) => {
    },
    setTheme: (key: string) => {
    },
    setLanguage: (key: any) => {
    },
})

const EditConfigProvier = observer((props: EditConfigProvierProps) => {
    const EditorStore: EditorContextProps = useLocalObservable(() => {
        return {
            language: 'zh_cn',
            theme: 'dark',
            configs: {
                colors: {
                    title: '碧空绿',
                    hexColor: '#51d6a9',
                    rgb: 'rgb(81, 214, 169)',
                    pinyin: 'BI KONG LV',
                    key: 'BIKONGLV'
                }
            },
            setColors: (color: Color) => {
                if (color) {
                    EditorStore.configs.colors = color
                }
            },
            setTheme: (key: string) => {
                console.log(key)
            },
            setLanguage: (key: any) => {
            },
        }
    })
    return <EditConfigContext.Provider value={EditorStore}>
        {props.children}
    </EditConfigContext.Provider>
})

export default EditConfigProvier