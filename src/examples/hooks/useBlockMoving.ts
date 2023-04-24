import React, { useState } from "react";
import { BlockProps } from "../Provider/Engine";


export const useBlockMoving = (): [
    (e: React.MouseEvent<HTMLDivElement>) => void,
    (e: React.MouseEvent<HTMLDivElement>, focusInfo: Map<string, BlockProps>, scale: number, blocks: BlockProps[]) => void,
    () => void,
] => {
    const handlePreMoving = (
        focusInfo: Map<string, BlockProps>,
        scale: number, 
        blocks: BlockProps[],
        movingStart: { startX: number, startY: number }) => {
        document.addEventListener('mousemove', handleMove)
        document.addEventListener('mouseup', revokeMove)
        // return {
        //     focusInfo,
        //     blocks,
        //     scale,
        //     movingStart
        // }
    }

    const handleMove = (
        e: React.MouseEvent<HTMLDivElement>,
    ) => {
        if (!movingStart) return
        let positions: BlockProps[] = []
        let currX = e.clientX / scale - movingStart.startX
        let currY = e.clientY / scale - movingStart.startY
        for (let item of focusInfo.values()) {
            positions.push({
                ...item,
                style: {
                    ...item.style,
                    left: (item.style.left as number + currX),
                    top: (item.style.top as number + currY),
                },
            })
        }
        positions = blocks.map((block: BlockProps) => {
            let repla = positions.find((position: BlockProps) => position.id === block.id)
            if (repla) {
                return {
                    ...repla
                }
            } else {
                return block
            }
        })
        // asyncBlocks('update', positions)
    }
    const revokeMove = () => {
        document.removeEventListener('mousemove', handleMove)
        document.removeEventListener('mouseup', revokeMove)
    }

    return [handlePreMoving, handleMove, revokeMove]
}