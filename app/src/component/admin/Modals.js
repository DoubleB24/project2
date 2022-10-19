import { Button, Modal } from "react-bootstrap";

export function ConfirmModal (props) {
    return(
        <Modal show={props.show} onHide={props.onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>{props.message}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={props.onconfirm}>ตกลง</Button>
                <Button variant="secondary" onClick={props.oncancle}>ยกเลิก</Button>
            </Modal.Footer>
        </Modal>
    )

};