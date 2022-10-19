import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { API_GET, API_POST } from "../../api";
import OrderListItem from "./OrderListItem";



export default function OrderHistory() {

    return (
        <>

            <div className='row mt-1 '>
                <div className='col text-center'>
                    <Table striped>
                        <thead className="frame3 text-white">
                            <tr>
                                <th>ลำดับ</th>
                                <th>หมายเลขคำสั่งซื้อ</th>
                                <th>วันที่สั่งซื้อ</th>
                                <th>ยอดเงินรวม</th>
                                <th>สถานะ</th>
                                

                            </tr>
                        </thead>
                    </Table>
                </div>
            </div>
        </>
    )
}