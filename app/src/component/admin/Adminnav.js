import { Link } from 'react-router-dom';
import "../admin/admin.css"

export default function Adminnav(props){

    let pages = props.pages;

    return(
        <>
            <div className="container-fluid" style={{padding:"0"}}>
                <div className="row a-style" style={{margin:"0"}}>
                
                        <div className="sidebar text-center position-relative ">
                            <div className="sidebar-img">
                                <img src={`http://localhost:8080/images/Logo.jpg`} alt="" style={{width:"225px"}}/>
                            </div>

                            <div className="sidebar-menu">
                                <Link className={pages === 1 && "active"} to ="/Admin">จัดการข้อมูลผู้ใช้</Link>
                            
                                <Link className={pages === 2 && "active" } to ="/Product" >ประเภทสินค้า</Link>
                            </div>

                            <div className="exit position-absolute bottom-0 end-0 start-0"> 
                                <Link to ="/" className="text1 text-white">ออกจากระบบ</Link>
                            </div>
                        
                        </div>
                
                </div>
            </div>
        </>
    )
}