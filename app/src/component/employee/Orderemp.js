import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import "./Employee.css"
import Employeenav from './Employeenav';
import { useNavigate, useParams } from 'react-router-dom';
import ProductList from './ProductList';
import { Table } from 'react-bootstrap';




export default function Orderemp() {

    let pages = 2;
    let params = useParams();
    let navigate = useNavigate();



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

                        <div className="p-2">
                            <div className=''>
                                <ProductList />
                            </div>

                            {/* <div className=" row-2 col-2 me"><br></br>

                                <Button className=" me-2 " variant="btn btn-danger">ยกเลิกรายการทั้งหมด</Button>
                                <Button href="FormOrderList" className=" me-2 mt-3 ms-3" variant="btn btn-success">สั่งซื้อสินค้า</Button> 
                            </div> */}

                        </div>

                        {/* <div className=" row-2  col-8 frame ">
                            <div className='table'></div>
                            
                            <OrderList />
                        </div> */}

                    </div>

                </div>

            </div>
        </>
    )
}
