import { Link } from 'react-router-dom';
import "./Employee.css"

export default function Employeenav(props){

    let pages = props.pages;

    return(
        <>
            <div className="container-fluid" style={{padding:"0"}}>
                <div className="row a-style" style={{margin:"0"}}>
                
                        <div className="sidebar text-center  position-relative">
                            <div className="sidebar-img">
                                <img src={`http://localhost:8080/images/Logo.jpg`} alt="" style={{width:"225px"}}/>
                            </div>
 
                            <div className="sidebar-menu">
                                <Link className={pages === 1 && "active"} to ="/Employee">แดชบอร์ด</Link>
                        
                                <Link className={pages === 2 && "active"} to ="/Orderemp" >สั่งซื้อสินค้า</Link>
                           
                                <Link className={pages === 3 && "active"} to ="/History" >ประวัติคำสั่งซื้อ</Link>
                    
                            </div>

                            <div className=" exit position-absolute bottom-0 end-0 start-0 "> 
                                <Link to ="/" className="text1 text-white">ออกจากระบบ</Link>
                            </div>
                        
                        </div>
                        
                </div>
            </div>
        </>
    )
}