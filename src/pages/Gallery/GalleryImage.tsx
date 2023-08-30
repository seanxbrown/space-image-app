import { Col, Image } from "react-bootstrap"
import { useState } from "react"

export const GalleryImage = ({ photo, inHD }: { photo: any, inHD: boolean }) => {
  const [hovering, setHovering] = useState<boolean>(false)


  return (
    <Col className="p-0 gallery-image-column"
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
