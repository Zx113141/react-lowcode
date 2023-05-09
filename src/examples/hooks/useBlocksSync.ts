

import React  from "react";
import { BlockProps } from '../Provider/Engine';

export type path = 'property' | 'data' | 'events'

export const useBlocksSync = (defaultValue: BlockProps[]): [BlockProps[], (action: string, block: BlockProps | BlockProps[]) => void] => {
    const [blocks, setBlocks] = React.useState<BlockProps[]>(defaultValue)
    const asyncBlocks = React.useCallback((action: string, block: BlockProps | BlockProps[], obj?: any) => {
        const path:[string, path] = action.split('.') as [string, path]
        switch (path[0]) {
            case 'add':
                addBlocks(block as BlockProps)
                break;
            case 'delete':
                deleteBlocks()
                break;
            case 'update':
                updateBlocks(block, obj, path[1])
                break;
            case 'lock':
                lockingBlocks()
                break;
            default:
                throw Error(`${path[0]} action is not a valid type`)
        }
    }, [blocks])

    const addBlocks = React.useCallback((block: BlockProps) => {
        console.log('add block')
        setBlocks([...blocks, block])
    }, [blocks])

    const deleteBlocks = React.useCallback(() => {

    }, [blocks])

    const updateBlocks = React.useCallback((block: BlockProps | BlockProps[], obj: any, path: path) => {
        if (block instanceof Array) {
            if (block.length > 1) {

            } else {
                let [focusBlock] = block
                const filterBlocks = blocks.filter((bl: BlockProps) => bl.id !== block[0].id)
                focusBlock[path] = {...obj}
                setBlocks([...filterBlocks, focusBlock])
            }
        }
    }, [blocks])

    const lockingBlocks = React.useCallback(() => {

    }, [blocks])

    return [blocks, asyncBlocks]
}