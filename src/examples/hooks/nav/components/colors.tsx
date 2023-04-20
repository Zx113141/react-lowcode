import { Card } from "antd"
import React,{useContext} from "react";
import { colors } from "@/configs/colors"
import { Color } from '../../../components/editor/index';
import styles from './color.module.less'
import { EditorContextProps,EditorContext } from "../../../components/editor/index";

const Colors = () => {
    
    const {setColors,configs} = useContext<EditorContextProps>(EditorContext)
    
    const setConfigsColor = (color:Color) => {
        if (configs.colors?.key === color.key) {
            return
        }
        setColors(color)
    }
    return (
        <div className={styles.colors}>
            {
                colors.map((color: Color) => {
                    return <div className={styles.colorsBox} key={color.key} onClick={() => setConfigsColor(color)}>
                        <div className={styles.colorsBoxColor}>
                            <div style={{ height: '100%', backgroundColor: color.hexColor }}>

                            </div>
                        </div>
                        <div className={styles.colorsBoxInfo}>
                            <div className={styles.colorsBoxInfoName}>
                                <p style={{ color: color.hexColor }}>
                                    {color.title}
                                </p>
                                <p>
                                    {color.pinyin}
                                </p>
                            </div>
                            <div className={styles.colorsBoxInfoValue}>
                                <span>
                                    {color.hexColor}
                                </span>
                                <span>
                                    |
                                </span>
                                <span>
                                    {color.rgb}
                                </span>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default Colors