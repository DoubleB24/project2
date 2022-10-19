import { Link } from "react-router-dom";
import "./Owner.css";
import Ownernav from "./Ownernav";




export default function Franchise(){
    let pages = 2;

    return(
        <>
            <div className='container-fluid  '>
                <div className='row'>
                    <div className="col-lg-2 p-0  sidebar" >
                        <Ownernav pages ={pages}/>
                    </div>
                    
                    <div className="col-lg-10 p-0 title content"><br></br>
                                <h1><center>จัดการข้อมูลแฟรนไชส์</center></h1><br></br>
                            <div className="col-2">
                                
                            </div>
                            <div className="col-10"></div>
                            

                            <div className="container frame">
                                
                           <div className="">
                               
                            </div> 
                                
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}