import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { API_GET, API_POST } from "../../api";
import OrderListItem from "./OrderListItem";



export default function ProductList() {


    const [productTypes, setProductTypes] = useState([]);
    const [product_type_id, setProductTypeId] = useState(0);
    const [list, setList] = useState([]);

    const [calAmount, setCalamount] = useState(0);
    const [calnet, setCalnet] = useState(0);

    let IntAmount = 0;
    let IntNet = 0;


    useEffect(() => {
        fetchproduct();

        IntAmount = typeof (parseInt(localStorage.getItem('calAmount')));
        console.log(IntAmount);
        IntNet = parseInt(localStorage.getItem('calNet'));

        // console.log(IntAmount);
        // console.log(parseInt(localStorage.getItem('calNet')));

        setCalamount(localStorage.getItem('calAmount'));
        setCalnet(localStorage.getItem('calNet'));

        console.log("aaa " + calnet);


    }, []);


    const fetchproduct = async () => {


        let json = await API_GET("productTypeowner")

        let products = json.data;



        if (json.result) {
            let basket = JSON.parse(localStorage.getItem('basket'));

            if (basket != null) {
                setList(basket);
                products.map(item => {
                    basket.map(basket => {
                        if (item.product_id === basket.product_id) {
                            console.log("2")
                            item.stock = item.stock - basket.amount
                            console.log(item)
                            console.log(basket)

                        }
                    })
                })
            }


            setProductTypes(products);
        }
        console.log(products)



    }

    const onCancel = async() =>{
        localStorage.removeItem('basket');
        localStorage.removeItem('calAmount');
        localStorage.removeItem('calNet');
        window.location.reload(false);

    }


    // const fetchData = async () => {
    //     let json = await API_GET("product");
    //     setProductTypes(json.data);

    // }





    return (
        <>

            <div className='row mt-1'>
                <div className='row-1 table1 frame bg-ligh'>
                    <Table striped >

                        <thead className="frame2 text-center">
                            <tr>
                                <th>รหัสสินค้า</th>
                                <th>ชื่อสินค้า</th>
                                <th>ราคา</th>
                                <th>Stock</th>
                                <th>จำนวน</th>
                                <th></th>
                            </tr>
                        </thead>




                        <tbody className="table-overflow text-center">
                            {
                                productTypes.map(item => (
                                    <OrderListItem
                                        key={item.product_id}
                                        data={item}
                                        list={list}
                                        setList={setList}
                                        setCalamount={setCalamount}
                                        calAmount={calAmount}
                                        fetchproduct={fetchproduct}
                                        setCalnet={setCalnet}
                                        calnet={calnet}
                                    />
                                ))
                            }
                        </tbody>





                    </Table>

                </div>



            </div>
            <div className="row-2 col-8">

                <div className="mt-5 ms-5 col-8 text-center">
                    <h1>ตระกร้าสินค้า</h1>
                </div>

                <Table striped>
                    <thead className="frame1 text-center">
                        <tr>
                            <th>รหัสสินค้า</th>
                            <th>ชื่อสินค้า</th>
                            <th>ราคา</th>
                            <th>จำนวน</th>
                            <th>ราคารวม</th>

                        </tr>
                    </thead>

                    <tbody className="text-center frame bg-ligh">
                        {
                            list != null &&
                            list.map(item => (

                                <tr key={item.product_id} >
                                    <td>{item.product_id}</td>
                                    <td>{item.product_name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.total}</td>
                                </tr>

                            ))

                        }
                        <tr>
                            <td colSpan={3}>รวม</td>
                            <td>{calAmount}</td>
                            <td> {calnet}</td>
                        </tr>



                    </tbody>

                </Table>



            </div>

            <div className=" row-2 col-2 me"><br></br>

                <Button className=" me-2 " variant="btn btn-danger" onClick={onCancel}>ยกเลิกรายการทั้งหมด</Button>
                <Button disabled={list.length < 1} href="FormOrderList" className=" me-2 mt-3 ms-3" variant="btn btn-success">สั่งซื้อสินค้า</Button>
            </div>
        </>
    )
}