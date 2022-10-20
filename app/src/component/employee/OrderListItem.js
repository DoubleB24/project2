import { Link } from "react-router-dom"
import { API_POST } from "../../api"
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export default function OrderListItem(props) {

    const [count,setCount] = useState(0);
    
    let amount = 0;
    let net = 0;

    function incrementCount() {
        setCount(count + 1);
    }

    function decrementCount() {
        if (count!=0){
             setCount(count -1);
        }
    }

    const onclickbasket = () =>{
        let basketcount = count;
        setCount(0);
        let sum = parseInt(props.data.price) * basketcount;

        console.log(props.data);
        let data = [];
        let list = props.list;
        if(list.length>0){
            console.log(list);
            data.push(...list);
        }else{
            // let json ={
            //     product_id: props.data.product_id,
            //     product_name: props.data.product_name,
            //     amount: count,
            //     total:sum
            // }

            // data.push(json);
            // console.log(data);

        }

        let json ={
            product_id: props.data.product_id,
            product_name: props.data.product_name,
            price:props.data.price,
            amount: basketcount,
            total:sum
    
        }
        // console.log("aaaaa "+amount);

        data.push(json);


        net = props.calnet+ sum;
        props.setCalnet(net); 
       

        amount = props.calAmount + basketcount;
        props.setCalamount(amount);

        // console.log("bbbb "+amount);

        localStorage.setItem('basket', JSON.stringify(data));
        localStorage.setItem('calNet', net);
        localStorage.setItem('calAmount', amount);
        console.log(localStorage.getItem('basket'));

        props.setList(data);
        props.fetchproduct();
       
    }


    

    return (
        <>

                
            <tr>
              

                <td><p>{props.data.product_id}</p></td>
                <td><p>{props.data.product_name}</p></td>
                <td><p>{props.data.price}</p></td>
                <td><p>{props.data.stock}</p></td>
                <td>
                    <div className=" count">

                        
                            <button onClick={decrementCount}>-</button>
                            <input type="number" value={count} className="text-count"></input>
                            <button onClick={incrementCount}>+</button>
                       

                        {/* <div className="col-4"> 
                            <input type="number"></input>

                        </div>

                        <div className="col-4" >
                            <button onClick={incrementCount}>+</button>
                        </div>
                         */}
                        
                    </div>
                </td>

                
                
                <td>
                    <div>
                            <Button className=" me-2" variant="primary" onClick={onclickbasket}>เพิ่มสินค้าลงตระกร้า</Button>
                            {/* <Link to={"/OrderList"} className="btn btn-success ms-3"> <i className="fa-solid fa-cart-shopping"></i> เพิ่มลงตระกร้า</Link>    */}
                    </div>
                </td>

                <td><p></p></td>
            </tr>

        </>
    )
}