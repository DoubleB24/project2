import { Link } from "react-router-dom"
import { API_POST } from "../../api"
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export default function OrderHistoryItem(props) {

    return (
        <>

                
            <tr>
              

                <td><p>1</p></td>
                <td><p>2</p></td>
                <td><p>2</p></td>
                <td><p>4</p></td>
                <td>5</td>

                <td>
                    <div>
                        <Button className=" me-2" variant="primary">เพิ่มสินค้าลงตระกร้า</Button>
                    </div>
                </td>
                
            </tr>

        </>
    )
}