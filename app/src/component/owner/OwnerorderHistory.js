import { Table } from "react-bootstrap";
import "./Owner.css";
import Ownernav from "./Ownernav";
import { API_GET, API_POST } from "../../api";
import { useEffect, useState } from "react";
import Button from "react-bootstrap";




export default function OwnerorderHistory() {
    let pages = 4;


    return (
        <>
            <div className='container-fluid  '>
                <div className='row'>
                    <div className="col-lg-2 p-0  sidebar" >
                        <Ownernav pages={pages} />
                    </div>

                    <div className="col-lg-10 p-0 title content"><br></br>
                        <h1><center>ประวัติคำสั่งซื้อ</center></h1><br></br>

                        <div className='row mt-1 '>
                            <div className='col text-center f1 table-overflow'>
                                <Table striped>
                                    <thead className="frame3  text-white">
                                        <tr>
                                            <th>หมายเลขคำสั่งซื้อ</th>
                                            <th>แฟรนไชส์</th>
                                            <th>วันที่สั่งซื้อ</th>
                                            <th>ยอดเงินรวม</th>
                                            <th><p></p></th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        }
                                    </tbody>

                                </Table>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}