import React, { useEffect, useState } from "react";
import styles from './colorPicker.module.less'
import { SketchPicker } from 'react-color'
const ColorPick = () => {
    const [display, setDisplay] = useState<boolean>(false)
    const [color, setColor] = useState('#eee')
    useEffect(() => {
        const handleDisplay = () => {
            setDisplay(false)
        }
        document.addEventListener('click', handleDisplay)

        return () => {
            document.removeEventListener('click', handleDisplay)
        }
    }, [])

    const hanleShow = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation()
        setDisplay(true)
    }

    return (
        <div className={styles.picker}>
            <div className={styles.pickerContent}
                style={{ backgroundColor: color }}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => hanleShow(e)}>

            </div>
            {
                display &&
                // 这个要阻止选中的事件冒泡
                <div style={{position:'absolute',zIndex:200}} onClick={(e: React.MouseEvent<HTMLDivElement>) => {e.preventDefault();e.stopPropagation()}}>
                    <SketchPicker onChange={(e) => setColor(e.hex)} color={color}></SketchPicker>
                </div>
            }
        </div>
        // <SketchPicker onSwatchHover={(e) => console.log(e)}></SketchPicker>
    )
}

export default ColorPick