import "./Employee.css";
import Employeenav from "./Employeenav";




export default function Employee() {
    let pages = 1;

    return (
        <>
            <div className='container-fluid  '>
                <div className='row'>
                    <div className="col-lg-2 p-0  sidebar" >
                        <Employeenav pages={pages} />
                    </div>

                    <div className="col-lg-10 p-0 title "><br></br>
                        <div className="">
                            <h1><center>แดชบอร์ด</center></h1><br></br>
                        </div>
                        <div className="tick"></div>

                        <div className=" ms-3 me-3 p-3 EmpF">
                            <div className="row">
                                <div className="col-6 ms-3 f1 ">
                                    <div className="mt-4 ps-4 ms-5 center1">
                                        <img src={`http://localhost:8080/images/waffle.jpg`} style={{ width: "450px", height: "510px" }} />
                                    </div>

                                </div>


                                <div className="col me-3 f1 ">
                                    <h1 className="mt-5">รายละเอียดการร่วมธุกิจ</h1>
                                    <tr>
                                        <p> - มีแพ็กเก็จแบบเดียว ขนาดร้านเล็กใหญ่ราคาเริ่มต้นเท่ากันเพราะใช้วัตถุดิบและอุปกรณ์เริ่มต้นเหมือนกัน 30 กว่ารายการ</p>
                                        <p> - ทุกขนาดพร้อมเปิดร้านลงทุนเริ่มต้น 30,000 บาทขึ้นไปขายได้ 2,000 – 3,000 บาท (ลงทุนเริ่มต้นแบ่งเป็นค่าแฟรนไชส์ 17,000 บาท และ ค่าวัตถุดิบอุปกรณ์และของตกแต่งร้าน 13,000+ ราคาอาจบวกเพิ่มตามการก่อสร้างและวัตถุดิบอุปกรณ์ที่ลูกค้าต้องการเพิ่มเติม)</p>
                                        <p> - ทางร้านจะหัก 5% ของทุกเดือนโดยการคำนวณจากการสั่งซื้อวัตถุดิบจากทางร้าน</p>
                                        <p> - จัดเต็มวัตถุดิบและอุปกรณ์</p>
                                        <p> - แป้ง waffle มีหลายรสชาติ และ เมนูมากกว่า 10 รายการ</p>
                                        <p> - ลูกค้าเลือกทำเลเอง</p>
                                        <p> - คืนทุนไว สร้างรายได้อย่างมั่นคง</p>

                                    </tr>


                                </div>
                            </div>


                        </div>



                    </div>
                </div>
            </div>
        </>
    )
}
