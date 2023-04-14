import React from 'react'

export const useContainer = (data: any,) => {
    let container = {}
    container = data.container
    const setContainer = (key?: string, value?: any) => {
        if (key, value) {
            // do something

        }
    }
    return { container, setContainer }
}