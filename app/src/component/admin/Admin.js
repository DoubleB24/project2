import 'bootstrap/dist/css/bootstrap.min.css';
import "../admin/admin.css"
import Adminnav from './Adminnav';
import User from './Users';

export default function Admin (){
    return(
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className="col-lg-2 content" style={{padding:"0"}}>
                        <Adminnav/>
                    </div>
                    <div className="col-lg-10 content" style={{background : "#223322"}}>
                        <Users/>
                    </div>
                </div>
            </div>
        </>
    )
}