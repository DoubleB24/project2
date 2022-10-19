import { useEffect,useState } from "react";
import { Table } from "react-bootstrap";
import { API_GET, API_POST } from "../../api";
import ProductItem from "./ProductItem";


export default function ProductType(){

    const [product_type_id,setProductTypeId] = useState(0);
    const [product_type, setProductType] = useState([]);


    useEffect( () => {
        async function fetchData(){
            const response = await fetch(
                "http://localhost:8080/api/product_type",
                {
                    method: "GET",
                    headers:{
                        Accept: "application/json",
                        'Content-Type' : 'application/json',
                    }
                }
            );

            let json = await response.json();
            setProductType(json.data);
        }
        fetchData();
    },[]);

    const onDelete = async (data) =>{
        console.log(data.product_type_id)

        let json = await API_POST("product_type/delete",{
            product_type_id: data.product_type_id
        });

        if(json.result){
            fetchData();
        }

    }

    const fetchData = async () =>{
        let json = await API_GET("product_type");
        setProductType(json.data);
        
    }


    return(
        <>
           
            <div className='row mt-1'>
                <div className='col text-center'>
                    <Table striped>
                        <thead>
                            <tr>
                            <th>รหัสประเภทสินค้า</th>
                            <th>ชื่อประเภทสินค้า</th>
                            
                            
                            </tr>
                        </thead>
                        <tbody>
                            {
                                product_type.map(item => (
                                    <ProductItem
                                    key={item.product_type_id}
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