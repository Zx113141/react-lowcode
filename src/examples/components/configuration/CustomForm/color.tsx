import React, { useState } from "react";
import { SketchPicker } from 'react-color'
const ColorPick = () => {
    const [display, setDisplay] = useState<boolean>(false)

    return (
        <div onClick={() => setDisplay(true)}>
            {
                display && <SketchPicker></SketchPicker>
            }
        </div>
    )
}

export default ColorPick