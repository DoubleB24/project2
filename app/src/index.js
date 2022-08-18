import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import TestState from './TestState';
import Login from './Login';
import Users from './component/admin/Users';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './Home';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="home" element={<Home />} />
      <Route path="user" element={<Users/>} />
    </Routes> 
  </BrowserRouter>

);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
