import { EngineContext, Engine } from "@/examples/Provider/Engine"
import { Radio } from "antd"
import { useContext } from "react"

interface EventsProps {
    events: any
}


const Events = (props: any) => {
    const { apiConifg, focus } = useContext<Engine>(EngineContext)

    return (
        <div>
            <Radio.Group>
                <Radio type="button"></Radio>
            </Radio.Group>
        </div>
    )
}

export default Events