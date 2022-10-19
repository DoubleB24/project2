import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import "./Employee.css"
import Employeenav from './Employeenav';
import OrderList from './OrderList';
import ProductList from './ProductList';
import { Table } from 'react-bootstrap';
import { Button } from "react-bootstrap";



export default function Orderemp() {

    let pages = 2;

    return (
        <>
            <div className='container-fluid '>
                <div className='row'>
                    <div className="col-lg-2 p-0 " style={{ padding: "0" }}>
                        <Employeenav pages={pages} />
                    </div>

                    <div className="col-lg-10 title content"><br></br>
                        <div className=""> 
                            <h1><center>รายการสินค้า</center></h1><br></br>
                        </div>
                        
                        <div className="tick"></div>

                        <div className="col-2">
                            {/* <Link to={"/product/add"} className="btn btn-success ms-3">{<i className="fa-solid fa-plus me-2"></i>}+ เพิ่มข้อมูล</Link>      
                             <Link to={"/Owner"} className="btn btn-outline-primary me-3">รายงาน</Link>    */}
                        </div>

                        <div className="">
                            <div className=''>
                                <ProductList />
                            </div>
                            
                        </div><br></br>

                        <div className=" row-2  col-8 frame ">
                            <div className='table'></div>
                            
                            {/* <OrderList /> */}
                        </div>


                        <div className="me"><br></br>
                            <Link to={"/"} className="btn btn exit ms-3">{<i className="fa-solid fa-plus me-2"></i>}ยกเลิกรายการทั้งหมด</Link><br></br>
                            <Link to={"/"} className="btn btn-success mt-5 ms-3">{<i className="fa-solid fa-plus me-2"></i>}สั่งซื้อสินค้า</Link>

                            <Button className=" me-2" variant="success" >ยกเลิกรายการทั้งหมด</Button>
                            <Button className=" me-2" variant="success" >สั่งซื้อสินค้า</Button>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}
