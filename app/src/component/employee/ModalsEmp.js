import { Button, Modal } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';

export function ConfirmOder (props) {
    let navigate = useNavigate();
    return(
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>{props.message}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button  variant="primary" onClick={props.onHide}>ตกลง</Button>

            </Modal.Footer>
        </Modal>
    )

};
