

import React, { useCallback } from "react";
import { BlockProps } from '../Provider/Engine';


export type actions = 'add' | 'delete' | 'update' | 'lock'

export const useBlocksSync = (defaultValue: BlockProps[]): [BlockProps[], (action: actions, block: BlockProps | BlockProps[]) => void] => {
    const [blocks, setBlocks] = React.useState<BlockProps[]>(defaultValue)
    const asyncBlocks = React.useCallback((action: actions, block: BlockProps | BlockProps[]) => {
        switch (action) {
            case 'add':
                addBlocks(block as BlockProps)
                break;
            case 'delete':
                deleteBlocks()
                break;
            case 'update':
                updateBlocks()
                break;
            case 'lock':
                lockingBlocks()
                break;
            default:
                throw Error('actions is not a valid type')
        }
    }, [blocks])

    const addBlocks = useCallback((block: BlockProps) => {
        setBlocks([...blocks, block])
    },[blocks])

    const deleteBlocks = React.useCallback(() => {

    }, [blocks])

    const updateBlocks = React.useCallback(() => {

    }, [blocks])

    const lockingBlocks = React.useCallback(() => {

    }, [blocks])

    return [blocks, asyncBlocks]
}