import "./Employee.css";
import Employeenav from "./Employeenav";




export default function PaymentEmp(){
    let pages = 4;

    return(
        <>
            <div className='container-fluid  '>
                <div className='row'>
                    <div className="col-lg-2 p-0  sidebar" >
                        <Employeenav pages ={pages}/>
                    </div>
                    
                    <div className="col-lg-10 p-0 title "><br></br>
                        <div className="">
                                <h1><center>ยอดชำระรายเดือน</center></h1><br></br>
                        </div>
                          
                        
                    </div>
                </div>
            </div>
        </>
    )
}
