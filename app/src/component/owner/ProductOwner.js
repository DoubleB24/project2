import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import "./Owner.css"
import Ownernav from './Ownernav';
import ProductOwners from './ProductOwners';



export default function ProductOwner (){
    let pages = 3;

    return(
        <>
            <div className='container-fluid '>
                <div className='row'>
                    <div className="col-lg-2 " style={{padding:"0"}}>
                        <Ownernav pages={pages}/>
                    </div>
                    
                    <div className="col-lg-10 title content"><br></br>
                            <h1><center>จัดการสินค้า</center></h1><br></br>
                    
                        <div className="col-3">
                             <Link to={"/product/add"} className="btn btn-success ms-3">{<i className="fa-solid fa-plus me-2"></i>}+ เพิ่มสินค้า</Link>      
                             <Link to={"/Owner"} className="btn btn-outline-primary mx-3">รายงาน</Link> 
                            
                           
                        </div>
                        
                        
                        <div className="col-10"></div>

                        <div className="container  frame">
                            <div className='table'></div>
                        <ProductOwners/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}