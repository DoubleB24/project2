import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { API_GET, API_POST } from "../../api";
import { ShowHistory } from "./ModalsEmp";
import { Button} from "react-bootstrap";




export default function OrderHistory() {
    const [listhistory, setListhistory] = useState([]);
    // const [user_id,setUserId] = useState(0);

    const [showModal, setShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalMessage, setModalMessage] = useState("")


    useEffect(() => {
        // setUserId(localStorage.getItem('user_id'));
        async function fetchData() {
            let json = await API_GET("order/getorder/" + localStorage.getItem('user_id'));
            setListhistory(json.data);
            console.log(json);
        }
        fetchData();
        console.log(listhistory);
    }, []);

    const onHide = () => {
        setShowModal(false);
    }

    const getMessageModal = () => {
        return (
            <ShowHistory
                show={showModal}
                title={modalTitle}
                message={modalMessage}
                onHide={onHide} />
        );
    }



    return (
        <>

            <div className='row mt-1 '>
                <div className='col text-center f1 table-overflow  '>
                    <Table striped>
                        <thead className="frame3 text-white">
                            <tr>

                                <th>หมายเลขคำสั่งซื้อ</th>
                                <th>วันที่สั่งซื้อ</th>
                                <th>ยอดเงินรวมออเดอร์</th>
                                <th>สถานะ</th>
                                <th><p></p></th>



                            </tr>
                        </thead>

                        <tbody>
                            {
                                listhistory.map(item => (
                                    <tr>
                                        <td>{item.order_id}</td>
                                        <td>{item.order_date}</td>
                                        <td>{item.total}</td>
                                        <td>{item.status}</td>{/* ไม่แสดงสถานะ */}
                                        <td><Button  variant="primary"><i class="fa-solid fa-magnifying-glass"></i></Button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}