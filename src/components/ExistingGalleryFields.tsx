import React from 'react'
import { Form } from "react-bootstrap"

export const ExistingGalleryFields = ({existingGalleryRef, galleries} : {existingGalleryRef: any, galleries: any}) => {
  return (
    <Form.Group>
        <Form.Label>Add to Existing Gallery</Form.Label>
        <Form.Select ref={existingGalleryRef}>
            <option value={"none-selected"}>Select a Gallery</option>
            {galleries && galleries.length > 0 ? galleries.map((gallery: any) => {
                if (typeof gallery === "object" && !gallery.isDeleted) {
                    return <option value={gallery.id} key={gallery.id}> {gallery.name} </option>}
                    }) : null }
        </Form.Select>
    </Form.Group> 
  )
}
