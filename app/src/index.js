import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import TestState from './TestState';
import Login from './Login';
import Users from './component/admin/Users';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './Home';
import Admin from './component/admin/Admin';
import Owner from './component/owner/Owner';
import Report from './component/owner/Report';

// import ProductForm from './component/admin/FormUsers';
import FormUsers from './component/admin/FormUsers';
import FormOrderList from './component/employee/FormOrderList';
import Employee from './component/employee/Employee';
import Product from './component/admin/Product';
import Orderemp from './component/employee/Orderemp';
import ProductOwner from './component/owner/ProductOwner';
import FormProductType from './component/admin/FormProductType';
import FormOwnerProduct from './component/owner/FormOwnerProduct';
import OrderHistory from './component/employee/OrderHistory';
import Franchise from './component/owner/Franchise';
import OwnerorderHistory from './component/owner/OwnerorderHistory';
import Order from './component/owner/Order';
import History from './component/employee/History';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/Users" element={<Users />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/Owner" element={<Owner/>}/>
      <Route path="/report" element={<Report/>}/>
      <Route path="/formUsers/:user_id" element={<FormUsers />} />
      <Route path="/FormOrderList" element={<FormOrderList/>}/>
      <Route path="/Employee" element={<Employee />} />
      <Route path="/Orderemp" element={<Orderemp/>} />
      <Route path="/History" element={<History/>} />
      <Route path="/OrderHistory" element={<OrderHistory/>} />
      <Route path="/Franchise" element={<Franchise/>} />
      <Route path="/OwnerorderHistory" element={<OwnerorderHistory/>} />
      <Route path="/Order" element={<Order/>} />
      <Route path="/Product" element={<Product />} />
      <Route path="/product_type" element={<FormProductType/>}/>
      <Route path="/FormProductType/:role_id " element={<FormProductType/>}/>
      <Route path="/product_type/:product_type_id" element={<FormProductType/>}/>
      <Route path="/ProductOwner" element={<ProductOwner/>}/>
      <Route path="/product/:productId" element={<FormOwnerProduct/>}/>

      {/* <Route path="/products/:product_type_id" element={<FormOwnerProduct/>}/> */}
      
 
    

    

    </Routes> 
  </BrowserRouter>

);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
