import { useEffect, useState } from 'react';
import{Form,Row, Col ,Button} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { API_GET,API_POST } from '../../api';
import Adminnav from './Adminnav';
import "../admin/admin.css"


export default function FormProductType (){

    let params = useParams();
    let navigate = useNavigate();
    let pages = 2;
    
    const [product_type_name,setProductTypeName] = useState("");
    const [product_type_id,setProductTypeId] = useState(0);
    const [product_type, setProductType] = useState([]);
    const [validated,setValidated] = useState(false);

    useEffect(() => {
        async function fetchData(product_type_id){
            let json = await API_GET("product_type/"+product_type_id);
            var data = json.data[0];

            setProductTypeName(data.product_type_name);
            setProductTypeId(data.product_type_id);
        }
        if(params.product_type_id != "add"){
            fetchData([params.product_type_id]);
        }
    },[]);

    const onsave = async (event)=>{
        const form = event.currentTarget;
        event.preventDefault();
        if(form.checkValidity()===false){
            event.stopPropagation();
        }else{
            console.log(params.product_type_id);
            if(params.product_type_id ==="add"){
                doCreateProductType();
                
            }else{
                doupdateProductType();
                
            }
        }
        setValidated(true);
    }

    // const doCreateProductType = async() => {
        
    //     const json = await API_POST("product_type/add",{
    //         product_type_name : product_type_name,
             
    //     });
    //     if(json.result){
    //         navigate("/Product", {replace: true});
    //     }
    // }

    // const doUpdateProductType = async()=>{
    //     console.log("อัปเดทสำเร็จ")
    // }

    const doCreateProductType = async(res)=>{
        const response = await fetch(
            "http://localhost:8080/api/product_type/add",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    Authorization: "Bearer" +localStorage.getItem("access_token")
                },
                body: JSON.stringify({
                    product_type_name: product_type_name
                })
            }
    
        )
        let json = await response.json();

        if(json.result){
            navigate("/Product", { replace: true});
        }

    }

    const doupdateProductType = async(res)=>{
        const response = await fetch(
            "http://localhost:8080/api/product_type/update",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    Authorization: "Bearer" +localStorage.getItem("access_token")
                },
                body: JSON.stringify({
                    product_type_id: product_type_id,
                    product_type_name: product_type_name
                })
            }
    
        )
        let json = await response.json();

        if(json.result){
            navigate("/Product", { replace: true});
            console.log("อัปเดทสำเร็จ");
        }

    }
    

    useEffect(() => {
        async function fetchData() {
            let json = await API_GET("product_type");
            setProductType(json.data);
        }
        fetchData();
    },[]);

    return(
        <>
         <div className='container-fluid bg-danger'>

            <div className='row'>
                <div className="col-lg-2 content" style={{padding:"0"}}>
                    <Adminnav pages={pages}/>
                </div >
                
                <div className="col-lg-10 content" style={{background : "#FEA4B0"}}><br></br>

                {params.product_type_id === "add"
                ?
                <h1 className='text-center'>เพิ่มประเภทสินค้า</h1>
                :<h1 className='text-center'>แก้ไขประเภทสินค้า</h1>}


                
                <Form className='container' noValidate validated={validated} onSubmit={onsave}>    
                    <Form.Group as={Col} controlId='validateProductTypeName'>
                        <Form.Label>ชื่อประเภทสินค้า</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={product_type_name}
                            placeholder = "ชื่อประเภทสินค้า"
                            onChange={(e) => setProductTypeName(e.target.value)}
                        />
                        {console.log(product_type_name)}
                        <Form.Control.Feedback type="invalid">
                            กรุณากรอกชื่อประเภทสินค้า
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Row className='my-3'>
                        <Button variant="success" as="input" type="submit" value="SAVE" onClick={onsave}/>
                    </Row>
                    {/* <navigate to="/Product" replace /> */}
                </Form>
     
                    </div>
                        <div className="col-lg-10 content" style={{background : "#FEA4B0"}}><br></br>
                    </div>
                </div>
            </div>
        
        </>
    )
}