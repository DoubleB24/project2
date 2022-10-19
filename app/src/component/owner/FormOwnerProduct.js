import { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { API_GET, API_POST } from '../../api';
import Ownernav from './Ownernav';
import "./Owner.css";
import { MessageModal } from './Modals';


export default function FormOwnerProduct() {

    let params = useParams();
    let navigate = useNavigate();
    let pages = 2;


    const [validated, setValidated] = useState(false);


    const [productId, setProductId] = useState(0);
    const [product_name, setProductName] = useState("");
    const [productTypes, setProductTypes] = useState([]);
    const [product_type_id, setProductTypeId] = useState(0);
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {

        async function fetchData(productId) {
            let json = await API_GET("product/" + productId);

            var data = json.data[0];


            setProductId(data.product_id);
            setProductName(data.product_name);
            setProductTypeId(data.product_type_id);
            setPrice(data.price);
            setStock(data.stock);
        }
        if (params.productId != "add") {
            fetchData([params.productId]);
        }
    }, [params.productId]);

    const onsave = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            
            if (params.productId === "add") {
                
                doCreateProduct();


            } else {
                
                doUpdateProduct();

            }
        }
        setValidated(true);
    }

    const doCreateProduct = async (res) => {

        const response = await fetch(
            "http://localhost:8080/api/product/add",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    Authorization: "Bearer" + localStorage.getItem("access_token")
                },
                body: JSON.stringify({
                    product_name: product_name,
                    product_type_id: product_type_id,
                    price: price,
                    stock: stock
                })
            }

        )
        let json = await response.json();
       

        if (json.result) {
            navigate("/ProductOwner");
        } else {
            setModalTitle("ไม่สามารถเพิ่มข้อมูลสินค้าได้");
            setModalMessage(json.message);
            setShowModal(true);
        }

    }

    const doUpdateProduct = async (res) => {
        
        const response = await fetch(
            "http://localhost:8080/api/product/update",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    Authorization: "Bearer" + localStorage.getItem("access_token")
                },
                body: JSON.stringify({
                    productId:productId,
                    product_name: product_name,
                    product_type_id: product_type_id,
                    price: price,
                    stock: stock
                })
            }

        )
        let json = await response.json();

        if (json.result) {
            navigate("/ProductOwner", { replace: true });
            console.log("อัปเดทสำเร็จ");
        }

    }

    

    const onHide = () => {
        setShowModal(false);
    }

    const getMessageModal = () => {
        return (
            <MessageModal
                show={showModal}
                title={modalTitle}
                message={modalMessage}
                onHide={onHide} />
        );
    }




    useEffect(() => {
        async function fetchData() {
            let json = await API_GET("producttypes");
            setProductTypes(json.data);
        }
        fetchData();
    }, []);

    return (
        <>
            <div className='container-fluid bg-danger'>

                <div className='row'>
                    <div className="col-lg-2 content" style={{ padding: "0" }}>
                        
                        <Ownernav pages={pages} />
                    </div >

                    <div className="col-lg-10 content" style={{ background: "#FEA4B0" }}><br></br>
                        

                        {params.productId === "add"
                            ?
                            <h1 className='text-center'>เพิ่มสินค้า</h1>
                            : <h1 className='text-center'>แก้ไขสินค้า</h1>}

                        {getMessageModal()}

                        
                        <div  className='col-10 r'>
                            <Link to={"/ProductOwner"} className="btn btn-primary  ms-3">{<i className="fa-solid fa-plus me-2"></i>}ย้อนกลับ</Link>
                        </div>


                        <Form className='container' noValidate validated={validated} onSubmit={onsave}>
                            <Form.Group as={Col} controlId="validateProductTypeId">
                                <Form.Label>ประเภทสินค้า</Form.Label>
                                <Form.Select
                                    value={product_type_id}
                                    onChange={(e) => setProductTypeId(e.target.value)}
                                    required>
                                    <option label="กรุณาเลือกประเภทสินค้า"></option>
                                    {
                                        productTypes.map(item => (
                                            <option
                                                key={item.product_type_id}
                                                value={item.product_type_id}>{item.product_type_name}</option>
                                        ))
                                    }
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    กรุณาเลือก ประเภทสินค้า
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="validateProductName">
                                <Form.Label>ชื่อสินค้า</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={product_name}
                                    placeholder="ชื่อสินค้า"
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    กรุณากรอกชื่อสินค้า
                                </Form.Control.Feedback>
                            </Form.Group>


                            <Form.Group as={Col} controlId="validatePrice">
                                <Form.Label>ราคา</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={price}
                                    placeholder="ราคา"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    กรุณากรอกราคาสินค้า
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} controlId="validateStock">
                                <Form.Label>จำนวนสินค้า</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    min="0"
                                    value={stock}
                                    placeholder="จำนวนสินค้า"
                                    onChange={(e) => setStock(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    กรุณากรอก จำนวนสินค้า
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Row className='my-3'>
                                <Button variant="success" as="input" type="submit" value="SAVE" />
                            </Row>
                        </Form>

                    </div>
                </div>
            </div>

        </>
    )
}