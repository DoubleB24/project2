import { Link } from 'react-router-dom';
import "./Owner.css";

export default function Ownernav(props) {

    let pages = props.pages;

    return (
        <>
            <div className="container-fluid" style={{ padding: "0" }}>
                <div className="row" style={{ margin: "0" }}>

                    {/* position-relative */}
                    <div className="sidebar text-center position-relative ">
                        <div className="sidebar-img">
                            <img src={`http://localhost:8080/images/Logo.jpg`} alt="" style={{ width: "225px" }} />
                        </div>

                        <div className='sidebar-menu'>

                            <Link className={pages === 1 && "active"} to="/Owner">แดชบอร์ด</Link>

                            <Link className={pages === 2 && "active "} to="/Franchise" >จัดการข้อมูลแฟรนไชส์</Link>

                            <Link className={pages === 3 && "active"} to="/ProductOwner" >จัดการสินค้า</Link>

                            <Link className={pages === 4 && "active"} to="/OwnerorderHistory" >ประวัติคำสั่งซื้อ</Link>

                            <Link className={pages === 5 && "active"} to="/Order" >คำสั่งซื้อ</Link>

                        </div>

                        <div className="exit position-absolute bottom-0 end-0 start-0 ">
                            <Link to="/" className="text1 text-white">ออกจากระบบ</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}