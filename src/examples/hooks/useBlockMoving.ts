import React from "react";
import { BlockProps } from "../Provider/Engine";


export const useBlockMoving = (focuInfo:Map<string, BlockProps>) => {
    
    const handleMoving = React.useCallback((event:React.MouseEvent<HTMLDivElement>, block:BlockProps) => {
        
    },[focuInfo])

    return [handleMoving]
}