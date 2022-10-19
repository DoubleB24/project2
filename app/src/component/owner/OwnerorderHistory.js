import { Link } from "react-router-dom";
import "./Owner.css";
import Ownernav from "./Ownernav";




export default function OwnerorderHistory(){
    let pages = 4;

    return(
        <>
            <div className='container-fluid  '>
                <div className='row'>
                    <div className="col-lg-2 p-0  sidebar" >
                        <Ownernav pages ={pages}/>
                    </div>
                    
                    <div className="col-lg-10 p-0 title content"><br></br>
                                <h1><center>ประวัติคำสั่งซื้อ</center></h1><br></br>
                        
                            <div className="col-lg-10 f1">
                                <h1>1234</h1>

                            </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}