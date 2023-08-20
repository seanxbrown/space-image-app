import { useParams } from "react-router-dom"

export const Gallery = () => {
  const { galleryID } = useParams()
  return (
    <div>Gallery</div>
  )
}

/*Need to create a dynamic route to the gallery page. Will take either a gallery or gallery array as a prop */