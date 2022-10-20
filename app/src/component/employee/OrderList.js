import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { API_GET, API_POST } from "../../api";
import OrderListItem from "./OrderListItem";



export default function OrderList() {

    const [data,setData] = useState([]);
    const [product,setProduct] = useState([]);
    const [product_name,setProductname] = useState([]);
    const [selectdata,setSelectdata] = useState({});
    const [list,setList] = useState([]);
    const [showselectProduct,setShowselectProduct] = useState(false);
    const [showselectbasket,setShowselectBasket] = useState(false);

    const [user_id,setUserid] = useState(0);
    const [total,setTotal] = useState([]);
    
    const [product_id,setProductId] = useState(0);
    const [amount,setAmount] = useState([]);
    const [order_id,setOrderId] = useState(0);

    // const [amountproduct,setAmountproduct] = useState(0);
    // const [net,setNet] = useState(0);


    useEffect(() =>{
        fetchData();
    }, []);

    useEffect(() => {
        if(product_name===""){
            setData(product);
        }
    },[product_name]);

    const fetchData = async()=>{
        let json = await API_GET("product");
        setData(json.data);
        setProduct(json.data);
    }

    const ONClick =(item) =>{
        setSelectdata(item);
        setShowselectProduct(true);
        setShowselectBasket(true);
    }

    const ONHide = () =>{
        setShowselectProduct(false);
        setShowselectBasket(false);
    }


    return (
        <>
{/* 
            <div className='row mt-1 '>
                <div className='col text-center'>
                    <Table striped>
                        <thead className="frame1">
                            <tr>
                                <th>ลำดับ</th>
                                <th>ชื่อสินค้า</th>
                                <th>ราคา</th>
                                <th>จำนวน</th>
                                <th>ราคารวม</th>

                            </tr>
                        </thead>

                        <tbody>
                            {
                                list !=null &&
                                list.map(item=>(
                                    <>
                                        <tr>
                                                <td>{item.product_id}</td>
                                                <td>{item.product_name}</td>
                                                <td>{item.price}</td>
                                                <td>{item.count}</td>
                                                <td>{item.total}</td>
                                        </tr>
                                    </>
                                ))
                            }
                                
                        </tbody>

                       

                    </Table>
                </div>
            </div> */}
        </>
    )
}