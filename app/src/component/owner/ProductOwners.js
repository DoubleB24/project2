import { useEffect,useState } from "react";
import { Table } from "react-bootstrap";
import { API_GET, API_POST } from "../../api";
import "./Owner.css";
import ProductOwnerItem from "./ProductOwnerItem";


export default function ProductOwners(){

    const [products, setProducts] = useState(0);
  
    const [productTypes, setProductTypes] = useState([]);
    const [product_type_id, setProductTypeId] = useState(0);


    useEffect( () => {
        async function fetchData(){
            const response = await fetch(
                "http://localhost:8080/api/product",
                {
                    method: "GET",
                    headers:{
                        Accept: "application/json",
                        'Content-Type' : 'application/json',
                    }
                }
            );

            let json = await response.json();
            setProductTypes(json.data);
            console.log(json.data)
        }
        fetchData();
    },[]);



    const onDelete = async (data) =>{
        console.log(data.product_id)

        let json = await API_POST("product/delete",{
            product_id: data.product_id
        });

        if(json.result){
            fetchData();
        }

    }

    const fetchData = async () =>{
        let json = await API_GET("product");
        setProductTypes(json.data);
        
    }


    return(
        <>
           
            <div className='row mt-1'>
                <div className='text-center'>
                    <Table striped>
                        <thead className="frame1">
                            <tr>
                            <th>ชื่อสินค้า</th>
                            <th>ประเภทสินค้า</th>
                            <th>ราคา</th>
                            <th>จำนวน</th>
                            <th></th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productTypes.map(item => (
                                    <ProductOwnerItem
                                    key={item.product_name}
                                    data={item}
                                    onDelete={onDelete} />
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}