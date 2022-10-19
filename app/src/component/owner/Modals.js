import {Modal, Button} from "react-bootstrap";

export function MessageModal(props){
    return (
        <Modal show={props.show} onHide={props.onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p className="text-center">{props.message}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={props.onHide}>ตกลง</Button>
            </Modal.Footer>
        </Modal>
    );
}