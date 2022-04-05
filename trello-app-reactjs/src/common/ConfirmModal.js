import { Modal, Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import parse from 'html-react-parser';
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from '../ultilities/constants';
const ConfirmModal = (props) => {
    let { title, content, show, onAction } = props;


    return (

        <Modal show={show} onHide={() => onAction(MODAL_ACTION_CLOSE)}
        // backdrop='static'
        // animation={false}
        // keyboard={false}
        // ignorebackdropclick={true}
        >
            <Modal.Header closeButton>
                <Modal.Title className='h5'>{parse(`${title}`)}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{parse(`${content}`)}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onAction(MODAL_ACTION_CLOSE)}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => onAction(MODAL_ACTION_CONFIRM)}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>

    )
}

export default ConfirmModal;
