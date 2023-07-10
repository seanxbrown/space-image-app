import { useRef } from 'react'
import { Button, Modal, Form } from "react-bootstrap"

export const GalleryModal = ({creatingGallery, closeModal, submitFunction} : {creatingGallery: boolean, closeModal: any, submitFunction: any}) => {
    const nameRef = useRef<HTMLInputElement | null>(null)
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        submitFunction(nameRef.current?.value);
    }
  return (
    <Modal show={creatingGallery} onHide={closeModal}>
        <Modal.Header closeButton>
            <Modal.Title>Create New Gallery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Gallery Name</Form.Label>
                    <Form.Control ref={nameRef} type="text" maxLength={20} placeholder="Solar System" />
                </Form.Group>
                <Button type="submit" variant="primary">Create</Button>
            </Form>

        </Modal.Body>
        
    </Modal>
  )
}
