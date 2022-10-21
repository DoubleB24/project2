import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { API_GET, API_POST } from "../../api";
import UsersItem from "./UsersItem";
import { Link } from "react-router-dom";
import "./admin.css";



export default function Users(){

    const [users,setUsers] = useState([]);
    const [roles, setRoles] = useState([]);


    useEffect( () => {
        async function fetchData(){
            const response = await fetch(
                "http://localhost:8080/api/users",
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

    const onDelete = async (data) =>{
        console.log(data.user_id)
        let json = await API_POST("users/delete",{
            user_id: data.user_id
        });

        if(json.result){
            fetchUser();
        }

    }

    const fetchUser = async () =>{
        let json = await API_GET("users");
        setUsers(json.data);
        
    }


    return(
        <>
            <div className="container title"><br></br>

                <div>
                    <h1><center>จัดการข้อมูลผู้ใช้</center></h1><br></br>
                
                
                    <div className="col-2 ">
                            <Link to={"/FormUsers/add"} className="btn btn-success ms-0">+ เพิ่มข้อมูล</Link>
                    </div>

                        <div className="row mt-3 frame">
                            <div className='table'></div>
                            
                                <div className='col text-center'>
                                    <Table striped>
                                        <thead>
                                            <tr>
                                            <th>รหัสผู้ใช้</th>
                                            <th>ชื่อผู้ใช้</th>
                                            <th>ตำแหน่ง</th>
                                            
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                users.map(item => (
                                                    <UsersItem
                                                    key={item.user_id}
                                                    data={item}
                                                    onDelete={onDelete} />
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                    </div>
                </div>
            </div>
        </>
    )
}