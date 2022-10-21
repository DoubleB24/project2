import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import "./Owner.css";
import Ownernav from "./Ownernav";
import { useEffect, useState } from "react";
import { API_GET, API_POST } from "../../api";
import { Button } from "react-bootstrap";
import OrderItem from "./OrderItem";





export default function Order() {
    let pages = 5;

    const [list,setList] = useState([]);
    const [Order_id, setOrder_id] = useState(0);

    useEffect(() =>{
        async function fetchData(){
            let json = await API_GET("order/getallorder");
            setList(json.data);
            console.log(json.data);
        }
        fetchData();
    },[])

const onConfirm =async (data) =>{
    let json = await API_POST("order/confirmorder",{
        order_id: data.order_id
    })
    if(json.result){
        fetchorder();
    }
    

}

const onCancel =async (data) =>{
   
    let json = await API_POST("order/cancelorder",{
        order_id: data.order_id
    });
    if(json.result){
        fetchorder();
    }
    
    
}

const  fetchorder =async () =>{
    let json = await API_GET("order/getallorder");
    setList(json.data);

}

    return (
        <>
            <div className='container-fluid  '>
                <div className='row'>
                    <div className="col-lg-2 p-0  sidebar" >
                        <Ownernav pages={pages} />
                    </div>

                    <div className="col-lg-10 p-0 title "><br></br>
                        <h1><center>คำสั่งซื้อ</center></h1><br></br>
                        <div className="tick"></div>
            
                        <div className='row mt-1 '>
                            <div className='col text-center f1 table-overflow'>
                                <Table striped>
                                    <thead className="frame3  text-white">
                                        <tr>
                                            <th>หมายเลขคำสั่งซื้อ</th>
                                            <th>แฟรนไชส์</th>
                                            <th>วันที่สั่งซื้อ</th>
                                            <th>ยอดเงินรวม</th>
                                            <th>สถานะ</th>
                                            <th>อนุมัติคำสั่งซื้อ</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            list.map(item =>(
                                               <OrderItem data={item} 
                                               onConfirm={onConfirm}
                                               onCancel={onCancel}/>
                                            ))
                                        }
                                    </tbody>

                                </Table>
                            </div>
                        </div>


                </div>
            </div>
        </div>
        </>
    )
}