import { Col, Image } from "react-bootstrap"
import { useState } from "react"

export const GalleryImage = ({ photo, inHD, selectPhoto }: { photo: any, inHD: boolean, selectPhoto: any }) => {
  const [hovering, setHovering] = useState<boolean>(false)

//31st aug: next step - have modal be displayed based on selected image
  return (
    <Col className="p-0 gallery-image-column"
    onClick={() => selectPhoto(photo.id)}
    onMouseEnter={()=> setHovering(true)}
    onMouseLeave={() => setHovering(false)} >
        <Image className="w-100 h-100" src={inHD ? photo.hdurl : photo.url} fluid />
        <div className="gallery-image-title w-100 h-100 d-flex justify-content-center align-items-center"
        style={{opacity: hovering? 1 : 0}}>
          {photo.title}
        </div>
    </Col>
  )
}
