import { Form } from "react-bootstrap"
import { IGallery } from '../types/types'

export const ExistingGalleryFields = ({ existingGalleryRef, galleries } : { existingGalleryRef: any, galleries: IGallery[] | null }) => {
  return (
    <Form.Group>
        <Form.Label>Add to Existing Gallery</Form.Label>
        <Form.Select ref={existingGalleryRef}>
            <option value={"none-selected"}>Select a Gallery</option>
            { galleries && galleries.length > 0 ? galleries.map((gallery: IGallery) => {
                if (typeof gallery === "object" && !gallery.isDeleted) {
                    return <option value={gallery.id} key={gallery.id}> {gallery.name} </option>}
                    }) : null }
        </Form.Select>
    </Form.Group> 
  )
}
