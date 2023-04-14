import styles from './index.module.less'
import {useRef} from 'react'

const Hover = (props) => {
    const {position, style, lineStyle, lineWidth} = props.rect
    const ref = useRef<HTMLCanvasElement>()
    const drawLine = () => {
        const ctx = ref.current?.getContext('2d') as CanvasRenderingContext2D
        ctx.beginPath()
        ctx.lineWidth = lineWidth
        ctx.fillStyle = lineStyle
        ctx.moveTo(position.x, position.y)
        ctx.lineTo(position.x + style.width, position)

    }
    console.log(style)
    return (
        <canvas ref={ref} width={style.width} height={style.height}></canvas>
    )
}

export default Hover