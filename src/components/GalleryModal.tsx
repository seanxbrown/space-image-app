import { useRef } from 'react'
import { Button, Modal, Form } from "react-bootstrap"
import { ExistingGalleryFields } from './Navigation/ExistingGalleryFields'

export const GalleryModal = ({creatingGallery, closeModal, submitFunction, page, galleries, photos} : {creatingGallery: boolean, closeModal: any, submitFunction: any, page: "search" | "gallery", galleries: unknown[] | null, photos?: unknown[] | undefined | null}) => {
    const newGalleryNameRef = useRef<HTMLInputElement | null>(null)
    const existingGalleryRef = useRef<HTMLSelectElement | null>(null)
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (page === "gallery") {
            submitFunction(newGalleryNameRef.current?.value);
        } else {
            submitFunction(newGalleryNameRef.current?.value, existingGalleryRef.current?.value);
        }
        
    }
 
  return (
    <Modal show={creatingGallery} onHide={closeModal}>
        <Modal.Header closeButton>
            {page === "gallery" ? <Modal.Title>Create New Gallery</Modal.Title> : <Modal.Title>Save Image</Modal.Title> }
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                {page === "search" && <ExistingGalleryFields existingGalleryRef={existingGalleryRef} galleries={galleries}/> }
                <Form.Group className="mb-3" id="gallery-name-input">
                    {page === "gallery" ? <Form.Label>Gallery Name</Form.Label> : <Form.Label>Add to New Gallery</Form.Label> }
                    <Form.Control ref={newGalleryNameRef} type="text" maxLength={20} placeholder="Solar System" />
                </Form.Group>
                <Button type="submit" variant="primary">Create</Button>
            </Form>
        </Modal.Body>
        
    </Modal>
  )
}
