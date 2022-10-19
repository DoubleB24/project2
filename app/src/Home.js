import { useEffect, useState } from "react";
import './Home.css';
import Admin from "./component/admin/Admin";
import Owner from "./component/owner/Owner";
import Employee from "./component/employee/Employee";
import Login from "./Login";

export default function Home(){

    const [role_id,setRoleId] = useState(0);

    useEffect(() =>{
        setRoleId(localStorage.getItem("role_id"));


    },[])


    return(
        <>
        {role_id == 0 &&<Login/>}
        {role_id == 1 && <Admin/>}
        {role_id == 2 && <Owner/>}
        {role_id == 3 && <Employee/>}
          
        </>
    )
}



