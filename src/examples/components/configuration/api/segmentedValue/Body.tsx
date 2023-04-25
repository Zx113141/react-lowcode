import Params, { type ParamsProps } from "./Params";
import { Form, Radio } from "antd";


const BodyParams = (props: ParamsProps) => {
    const { validateIndex } = props
    const onValueChange = (value: any) => {
        console.log(value)
    }
    return (
        <>
            <Form.Item colon={false} label=" ">
                <Radio.Group onChange={(value) => onValueChange(value)}>
                    <Radio value="none">none</Radio>
                    <Radio value="form-data">form-data</Radio>
                    <Radio value="x-www-form-urlencoded">x-www-form-urlencoded</Radio>
                </Radio.Group>
            </Form.Item>
            <Params validateIndex={validateIndex}></Params>
        </>
    )
}

export default BodyParams