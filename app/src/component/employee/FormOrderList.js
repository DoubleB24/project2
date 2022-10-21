import { Table } from "react-bootstrap"
import { Link } from "react-router-dom";
import Employeenav from "./Employeenav"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { ConfirmOder } from "./ModalsEmp";
import { API_GET, API_POST } from "../../api";


export default function FormOrderList() {
    let pages = 2;
    let navigate = useNavigate();


    const [listbasket, setListbasket] = useState([]);
    const [net, setNet] = useState(0);

    //ConfirmModal
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [modalConfirmTitle, setModalConfirmTitle] = useState("");
    const [modalConfirmMessage, setModalConfirmMessage] = useState("");

    const [user_id, setUser_id] = useState(0);
    const [amount, setAmount] = useState(0);
    const [order_id, setOrder_id] = useState(0);



    let IntNet = 0;
    let IntAmount = 0;
    let Order = 0;


    useEffect(() => {
        async function fetchData() {

            IntNet = parseInt(localStorage.getItem("calNet"));
            IntAmount = parseInt(localStorage.getItem("calAmount"));

            setListbasket(JSON.parse(localStorage.getItem('basket')));
            setNet(IntNet);
            setAmount(IntAmount);
            let user = localStorage.getItem('user_id');
            console.log(localStorage.getItem('user_id'));
            setUser_id(user);


        }
        fetchData();

    }, []);


    const onconfirmorder = async () => {
        onsaveOrder();
        localStorage.removeItem('basket');
        localStorage.removeItem('calAmount');
        localStorage.removeItem('calNet');
        setShowConfirmModal(true);
        setModalConfirmTitle("สั่งซื้อสินค้าสำเร็จ");
        setModalConfirmMessage("โปรดรอรับการยืนยันจากทางร้าน");

    }

    const onHide = () => {
        setShowConfirmModal(false);
        navigate(`../Orderemp`, { replace: true });
    }

    const onsaveOrder = async () => {
        let json = await API_POST("order/createorder", {
            user_id: user_id,
            amount: amount,
            total: net + 100
        });
        if (json.result) {
            let res = await API_GET("order/maxorderid");
            Order = res.data[0].order_id;
            // setOrder_id(order);
            // console.log(order_id);
            console.log(Order);
            if (res.result) {
                listbasket.map(async (item) => {

                    let result = await API_POST("order/createItem", {
                        product_id: item.product_id,
                        price: item.price,
                        amount: item.amount,
                        total: item.total,
                        order_id: Order
                    });

                    if (result.result) {
                        let result = await API_POST("order/decreasorder", {
                            amount: item.amount,
                            product_id: item.product_id

                        });
                    }


                });

            }

        }
    }

    return (
        <>
            <div className="container-fluid ">
                <div className="row">
                    <div className="col-lg-2 p-0 " style={{ padding: "0" }}>
                        <Employeenav pages={pages} />
                    </div>

                    <div className="col-lg-10 title content"><br></br>
                        <div className="">
                            <h1><center>รายการสินค้า</center></h1><br></br>
                        </div>
                        <div className="tick"></div>

                        <div className='row mt-1 '>


                            <div className='r'>
                                <Link to={"/Orderemp"} className="btn btn-primary  ms-3">{<i className="fa-solid fa-plus me-2"></i>}ย้อนกลับ</Link>
                            </div>



                            <div className='text-center table1 mt-3 f2'>
                                <Table striped>
                                    <thead className="frame3 text-white ">
                                        <tr>
                                            <th>รหัสสินค้า</th>
                                            <th>ชื่อสินค้า</th>
                                            <th>ราคา</th>
                                            <th>จำนวน</th>
                                            <th>ราคารวม</th>

                                        </tr>
                                    </thead>

                                    <tbody className="text-center">
                                        {
                                            listbasket.map(item => (

                                                <tr key={item.product_id} >
                                                    <td>{item.product_id}</td>
                                                    <td>{item.product_name}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.amount}</td>
                                                    <td>{item.total}</td>
                                                </tr>

                                            ))
                                        }

                                    </tbody>
                                </Table>
                            </div>

                            <div>
                                <div className='mt-3 f4 text-center'>

                                    <h5 className="frame4 text-white">ที่อยู่การจัดส่ง</h5>
                                    <Form.Control className="form-text my-3"
                                        as="textarea" />
                                </div>
                            </div>

                            <div className="row m-auto">
                                <div className="col-5 ">
                                    <div className='mt-3  f5 text-center'>
                                        <h5 className="frame5 text-white">ช่องทางการชำระเงิน</h5>
                                        <div className="row p-2">
                                            <div className="col-5 text-end">
                                                <img src={`http://localhost:8080/images/krungthai.jpg`} alt="" className="pix" />
                                            </div>


                                            <div className="col-7 text-center">
                                                <h6>ธนาคารกรุงไทย</h6>
                                                <h6>เลขที่บัญชี 9300317156</h6>
                                                <h6>ชื่อบัญชี ศศินา  วรเดช</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="ms-5 col-6 ">
                                    <div className='mt-3 f5 '>
                                        <h5 className="frame5 text-white text-center">สรุปรายการ</h5>
                                        <div className="row">
                                            <p className="col-8 text-end">ยอดรวมทั้งหมด  :</p>
                                            <p className="col-4">{net}</p>
                                        </div>

                                        <div className="row">
                                            <p className="col-8 text-end">ค่าจัดส่ง  :</p>
                                            <p className="col-4">100</p>
                                        </div>

                                        <div className="row ">
                                            <p className="col-8 text-end">ราคารวมสินค้าทั้งหมด  :</p>
                                            <p className="col-4">{net + 100}</p>
                                        </div>



                                    </div>
                                </div>

                            </div>


                        </div>

                        <div className="text-center ">
                            <Button variant="success" className="col-12 my-5" size="lg" onClick={onconfirmorder}>ชำระเงิน</Button>
                        </div>
                        <ConfirmOder
                            show={showConfirmModal}
                            title={modalConfirmTitle}
                            message={modalConfirmMessage}
                            onHide={onHide} />

                    </div>


                </div>


            </div>

        </>
    )
}