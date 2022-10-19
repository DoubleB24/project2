import { Link } from 'react-router-dom';
import "../admin/admin.css";
import Adminnav from './Adminnav';
import Users from './Users';


export default function Admin(){
    let pages = 1;

    return(
        <>
            <div className='container-fluid  '>
                <div className='row'>
                    <div className="col-lg-2 p-0  sidebar" >
                        <Adminnav pages={pages}/>
                    </div>
                    
                    <div className="col-lg-10 p-0 title "><br></br>
                           <Users/>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

