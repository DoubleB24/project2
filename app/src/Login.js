 // import { auto } from '@popperjs/core';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./Login.css"

var md5 = require("md5");

export default function Login() {
    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();

    const onLogin = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
    
        if(form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            doLogin();
        }
    
        setValidated(true);
    }
    
    const doLogin = async () => {
    
        const data1 = await getAuthenToken();
        const authToken = data1.data.auth_token;
        console.log(authToken);     
        const data2 = await getAccessToken(authToken);
        console.log(data2.data.access_token);
        localStorage.setItem("access_token", data2.data.access_token);
        localStorage.setItem("user_id", data2.data.account_info.user_id);
        localStorage.setItem("username", username);
        localStorage.setItem("role_id", data2.data.account_info.role_id);


        navigate("Home", { replace: false});
    
    }

    const getAuthenToken = async () =>{
        const response = await fetch(
            "http://localhost:8080/api/authen_request",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    username: md5(username)
                })
            }
        );
        
        const data = await response.json();
    
        console.log(data);
    
        return(data);
    }

    const getAccessToken = async (authToken) => {
        
        var baseString = username + "&" + md5(password);
        var authenSignature = md5(baseString);
        console.log(authenSignature);
        const response = await fetch(
            "http://localhost:8080/api/access_request",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    auth_signature: authenSignature,
                    auth_token: authToken
                })
            }
        );
        const data = await response.json();
        console.log(data);
        return data;
    }

    return (
        <>
            <div className='container-fluid login bg-danger login '>
            <h1>LITTLE BOY WAFFLE</h1>
            </div>
           
                <div className='container m-auto '>
                    <Form noValidate validated={validated} onSubmit={onLogin}>

                        <div className='col-2 container grid login'>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="validateUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Username"
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        กรุณากรอก Username
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="validatePassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
                                    <Form.Control.Feedback type="invalid">
                                        กรุณากรอก Password
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <Button type="submit">Login</Button>
                                </Col>
                            </Row>
                        </div>
                        
                    </Form>
                </div>
            
        </>
    );
}

