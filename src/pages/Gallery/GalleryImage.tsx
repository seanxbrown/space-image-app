import { Col, Image } from "react-bootstrap"
import { useState } from "react"
import { IPhoto } from "../../types/types"

export const GalleryImage = ({ photo, inHD, selectPhoto }: { photo: IPhoto, inHD: boolean, selectPhoto: (string: string) => void }) => {
  const [hovering, setHovering] = useState<boolean>(false)

  return (
    <Col 
      className="p-0 gallery-image-column"
      onClick={() => selectPhoto(photo.id)}
      onMouseEnter={()=> setHovering(true)}
      onMouseLeave={() => setHovering(false)} 
    >
      <Image className="gallery-image" src={inHD ? photo.hdurl : photo.url} fluid />
      <div 
        className="gallery-image-title w-100 h-100 d-flex justify-content-center align-items-center"
        style={{opacity: hovering? 1 : 0}}
      >
        {photo.title}
      </div>
    </Col>
  )
}
