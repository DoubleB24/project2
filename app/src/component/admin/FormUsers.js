import { useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { API_GET, API_POST } from '../../api';
import Adminnav from './Adminnav';

export default function FormUsers() {

    let params = useParams();
    let navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [user_id,setUserId] = useState(0);
    const [user_name, setUsername] = useState("");
    const [user_pwd, setUserpwd] = useState("");
    const [role_id, setRoleid] = useState(0);
    const [roles, setRoles] = useState([]);

    const [validated, setValidated] = useState(false);

    useEffect(() => {

        async function fetchData (user_id){
            let json = await API_GET ("users/"+user_id);
            var data = json.data[0];
            console.log(data)

            setUserId(data.user_id);
            setUsername(data.user_name);
            setRoleid(data.role_id);
        }
        if(params.user_id != "add"){
            fetchData([params.user_id]);
            
        }

        fetchRoles();

    }, []);

    const onsave = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {

            if (params.user_id === "add") {
                doCreateUser();

            } else {
                doUpdateUser();

            }
        }
        setValidated(true);
    }

    const doCreateUser = async (res) => {

        const response = await fetch(
            "http://localhost:8080/api/formUsers/add",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    Authorization: "Bearer" + localStorage.getItem("access_token")
                },
                body: JSON.stringify({
                    user_name: user_name,
                    user_pwd: user_pwd,
                    role_id: role_id
                })
            }

        )
        let json = await response.json();

        if (json.result) {
            navigate("/Admin");
        }

    }


    const doUpdateUser = async (res) => {

        let json = await API_POST("users/update",{
            user_name: user_name,
            user_pwd:user_pwd,
            role_id: role_id,
            user_id,user_id
            
            
        })

        if (json.result) {
            navigate("/Admin", { replace: true});
            console.log(json)
        }

    }




    // const doUpdateUser = async () => {

    //     const json = await API_POST("users/update", {
    //         user_name: user_name,
    //         user_pwd: user_pwd,
    //         role_id: role_id

    //     });
    //     if (json.result) {
    //         navigate("/Admin", { replace: true });
    //     }
    // }

 

    const fetchRoles = async () => {
        let json = await API_GET("roles");
        setRoles(json.data)
        console.log(json)


    }

    const fetchData = async () => {
        let json = await API_GET("users");
        setUsers(json.data)
        console.log(json)
    }



    return (
        <>
            <div className='container-fluid bg-danger'>
                <div className='row'>
                    <div className="col-lg-2 " style={{ padding: "0" }}>
                        <Adminnav />
                    </div>
                    <div className="col-lg-10 content" style={{ background: "#FEA4B0" }}><br></br>

                        {params.user_id === "add"
                            ?
                            <h1 className='text-center'>เพิ่มข้อมูลผู้ใช้</h1>
                            :
                            <h1 className='text-center'>แก้ไขข้อมูลผู้ใช้</h1>}


                        <Form className='container' noValidate validated={validated} onSubmit={onsave}>

                            <Form.Group as={Col} controlId="validateRolrid">
                                <Form.Label>ตำแหน่งผู้ใช้</Form.Label>
                                <Form.Select
                                    value={role_id}
                                    onChange={(e) => setRoleid(e.target.value)}
                                    required>
                                    <option label="กรุณาเลือกตำแหน่งผู้ใช้"></option>
                                    {
                                        roles.map(item => (
                                            <option
                                                key={item.role_id}
                                                value={item.role_id}>{item.role_name}</option>
                                        ))
                                    } 
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    เลือกตำแหน่งผู้ใช้
                                </Form.Control.Feedback>
                            </Form.Group>


                            <Form.Group as={Col} controlId='validateUsername'>
                                <Form.Label>ชื่อผู้ใช้</Form.Label>
                                <Form.Control
                                    required
                                    type='text'
                                    value={user_name}
                                    placeholder="ชื่อผู้ใช้"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    กรุณากรอกชื่อผู้ใช้
                                </Form.Control.Feedback>
                            </Form.Group>



                            <Form.Group controlId='validateUserpwd'>
                                <Form.Label>รหัสผ่าน</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={user_pwd}
                                    placeholder="รหัสผ่าน"
                                    required
                                    onChange={(e) => setUserpwd(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    กรุณากรอกรหัสผ่าน
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Row className='p-3'>
                                <Button variant="success" as="input" type="submit" value="SAVE" />
                            </Row>
                            {/* <navigate to="Admin" replace /> */}
                        </Form>

                    </div>
                </div>
            </div>

        </>
    )
}