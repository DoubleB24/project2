import { Button } from "react-bootstrap";

export default function OrderItem(props) {

    const onConfirm = async () => {
        props.onConfirm(props.data);


    }

    const onCancel = async () => {
        props.onCancel(props.data);

    }

    return (
        <tr>
            <td>{props.data.order_id}</td>
            <td>{props.data.user_name}</td>
            <td>{props.data.order_date}</td>
            <td>{props.data.net}</td>
            <td>{props.data.status}</td>
            <td>
                <Button className=" me-2" variant="primary" onClick={onConfirm}>อนุมัติ</Button>
                <Button className=" me-2 exit text-white" variant="primary" onClick={onCancel}>ไม่อนุมัติ</Button>
            </td>
        </tr>
    )


}