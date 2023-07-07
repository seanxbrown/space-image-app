import React from 'react'
import { Button, Modal, Form } from "react-bootstrap"

export const GalleryModal = ({creatingGallery, closeModal, submitFunction} : {creatingGallery: boolean, closeModal: any, submitFunction: any}) => {

    function handleSubmit(e: any) {
        e.preventDefault();
        submitFunction();
    }
  return (
    <Modal show={creatingGallery} onHide={closeModal}>
        <Modal.Header closeButton>
            <Modal.Title>Create New Gallery</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Gallery Name</Form.Label>
                    <Form.Control type="text" maxLength={20} placeholder="Solar System" />
                </Form.Group>
                <Button type="submit" variant="primary">Create</Button>
            </Form>

        </Modal.Body>
        
    </Modal>
  )
}
