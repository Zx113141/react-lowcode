import React, { useState, useCallback } from "react";

export const useDragList = (blocks: any[]) => {
    const [blockList, setBlockList] = useState(blocks)
    const addBlock = (dragItem) => {
        setBlockList(blockList.concat(dragItem))
    }
    const updateBlocks = (list) => {
        setBlockList([...list])
    }
    return [blockList, updateBlocks,addBlock]
}