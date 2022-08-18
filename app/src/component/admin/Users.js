import { useEffect, useState } from "react";

export default function User(){

    const [users,setUsers] = useState([]);

    useEffect( () => {
        async function fetchData(){
            const response = await fetch(
                "http://localhost:8000/api/users",
                {
                    method: "GET",
                    headers:{
                        Accept: "application/json",
                        'Content-Type' : 'application/json',
                    }
                }
            );

            let json = await response.json();
            setUsers(json.data);
        }
        fetchData();
    },[]);
    return(
        <>
            <div>
                {
                    users.map(item =>{
                       <div>
                             <h1>{item.user_id}</h1>
                             <h1>{item.user_name}</h1>
                             <h1>{item.user_password}</h1>
                             <h1>{item.role_id}</h1>
                       </div>
                    })

                }
            </div>
        </>
    )
}