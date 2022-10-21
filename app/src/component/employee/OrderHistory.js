import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { API_GET, API_POST } from "../../api";
import OrderListItem from "./OrderListItem";



export default function OrderHistory() {
    const [listhistory, setListhistory] = useState([]);
    // const [user_id,setUserId] = useState(0);

    useEffect(() =>{
        // setUserId(localStorage.getItem('user_id'));
        async function fetchData(){
            let json = await API_GET("order/getorder/"+localStorage.getItem('user_id'));
            setListhistory(json.data);
            console.log(json);
        }
        fetchData();
        console.log(listhistory);
    },[]);

    return (
        <>

            <div className='row mt-1 '>
                <div className='col text-center table-overflow  '>
                    <Table striped>
                        <thead className="frame3 text-white">
                            <tr>
                                
                                <th>หมายเลขคำสั่งซื้อ</th>
                                <th>วันที่สั่งซื้อ</th>
                                <th>ยอดเงินรวม</th>
                                <th>สถานะ</th>
                                

                            </tr>
                        </thead>

                        <tbody>
                            {
                                listhistory.map(item => (
                                    <tr>
                                        <td>{item.order_id}</td>
                                        <td>{item.order_date}</td>
                                        <td>{item.total}</td>
                                        <td>{}</td>

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