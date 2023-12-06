import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function DescriptionModal({ room, children }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button onClick={handleShow} className="btn btn-primary ml-2">
        View Details
      </button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{room?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
          <p className="mt-3">{room?.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DescriptionModal;
