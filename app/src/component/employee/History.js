import "./Employee.css";
import Employeenav from "./Employeenav";
import OrderHistory from "./OrderHistory";




export default function History() {

    let pages = 3;
    return (
        <>
            <div className='container-fluid  '>
                <div className='row'>
                    <div className="col-lg-2 p-0  sidebar" >
                        <Employeenav pages={pages} />
                    </div>

                    <div className="col-lg-10 p-0 title  "><br></br>
                        <div className="">
                            <h1><center>ประวัติคำสั่งซื้อ</center></h1><br></br>
                        </div>

                        <div className="tick"></div>

                        <div className="p-3 f2">
                        <OrderHistory/>

                        </div>
                    </div>
                  
                </div>
            </div>
        </>
    )
}
