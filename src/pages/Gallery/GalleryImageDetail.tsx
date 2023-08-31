import { Modal, Button } from "react-bootstrap";
import { formatDate } from "../../utils/utils";

export const GalleryImageDetail = ( {photo, show, closeImageDetail, openPhotoDeletionAlert } : { photo: any, show: boolean, closeImageDetail: any, openPhotoDeletionAlert:any}) => {
  return (
    <Modal show={show} fullscreen={true} onHide={closeImageDetail} className="vh-100 vw-100">
      <Modal.Header closeButton>
        <Modal.Title>
          {`${photo.title}: ${formatDate(photo.date)}`}
        </Modal.Title>
        <Button type="button" variant="danger" onClick={openPhotoDeletionAlert}>Delete Image</Button>
      </Modal.Header>
      <Modal.Body>
        <img src={photo.hdurl} alt={photo.explanation} className="mw-100"/>
      </Modal.Body>
      <Modal.Footer>
        {photo.explanation}
      </Modal.Footer>
    </Modal>
  )
}
