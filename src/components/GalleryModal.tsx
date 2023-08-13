import { useRef } from 'react'
import { Button, Modal, Form } from "react-bootstrap"

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

    // 13/07: work out how to add a ref to a select element and use the value

    /* Logic needs to be: If the new gallery field is blank, use the value from the dropdown as the gallery name and save the photo to that gallery.

    Else, create a new gallery using the newgalleryname ref and add the photo there.

    */
   
  return (
    <Modal show={creatingGallery} onHide={closeModal}>
        <Modal.Header closeButton>
            {page === "gallery" ? <Modal.Title>Create New Gallery</Modal.Title> : <Modal.Title>Save Image</Modal.Title> }
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                {page === "search" && <Form.Group>
                    <Form.Label>Add to Existing Gallery</Form.Label>
                    <Form.Select ref={existingGalleryRef}>
                        <option value={"none-selected"}>Select a Gallery</option>
                        {galleries && galleries.length > 0 ? galleries.map((gallery: any) => {
                            if (typeof gallery === "object") {return <option value={gallery.id} key={gallery.id}> {gallery.name}</option>}
                             }) : null }
                    </Form.Select>
                </Form.Group> }
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
