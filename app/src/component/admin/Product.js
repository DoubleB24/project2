import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import "../admin/admin.css"
import Adminnav from './Adminnav';
import ProductType from './Products';


export default function Product (){
    let pages = 2;

    return(
        <>
            <div className='container-fluid bg-danger'>
                <div className='row'>
                    <div className="col-lg-2 " style={{padding:"0"}}>
                        <Adminnav pages={pages}/>
                    </div>
                    
                    <div className="col-lg-10 title content"><br></br>
                            <h1><center>ประเภทสินค้า</center></h1><br></br>
                    
                        <div className="col-2">
                             <Link to={"/product_type/add"} className="btn btn-success ms-3">+ เพิ่มข้อมูล</Link>
                        </div>
                        <div className="col-10"></div>

                        <div className="container  frame">
                            <div className='table'></div>
                        <ProductType/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}