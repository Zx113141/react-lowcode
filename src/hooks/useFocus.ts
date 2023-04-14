

export const useFocus = (blockList: any[], updateBlock: (param: any[]) => void) => {
    let focus: any[] = []
    let unFocus: any[] = []
    const clearFocus = (comp?: any) => {

        let blocks: any[] = []
        blockList.forEach(it => {
            blocks.push({
                ...it,
                focus: false
            })
        })

        if (comp) {
            return blocks
        }
        if (blockList.every((block: any) => !block.focus)) {
            return
        }
        updateBlock(blocks)
    }

    const getFocus = (block: any, mode: string = 'single') => {
        let list: any[] | undefined = []
        if (mode == 'single') {
            if (block.focus) {
                return
            }
            list = clearFocus(block)?.map(it => {
                if (it.id === block.id) {
                    return {
                        ...it,
                        focus: true
                    }

                } else {
                    return it
                }
            })
        } else {
            list = blockList.map(it => {
                if (it.id === block.id) {
                    return {
                        ...it,
                        focus: !it.focus
                    }
                } else {
                    return it
                }
            })
        }
        list?.forEach(it => {

            it.focus ? focus.push(it) : unFocus.push(it)
        })
        updateBlock(list)
    }

    return [clearFocus, getFocus, unFocus, focus]
}