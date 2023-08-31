import { Modal } from "react-bootstrap";
import { formatDate } from "../../utils/utils";

export const GalleryImageDetail = ( {photo, show, closeImageDetail } : { photo: any, show: boolean, closeImageDetail: any}) => {
  return (
    <Modal show={show} fullscreen={true} onHide={closeImageDetail} className="vh-100 vw-100">
      <Modal.Header closeButton>
        <Modal.Title>
          {`${photo.title}: ${formatDate(photo.date)}`}
        </Modal.Title>
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
