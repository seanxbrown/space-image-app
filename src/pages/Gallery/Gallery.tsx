import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { doc, getDoc, db } from "../../config/firebaseConfig"
import { AuthContext } from "../../contexts/AuthContext"
import { Image } from "react-bootstrap"

export const Gallery = () => {
  const [currentGallery, setCurrentGallery] = useState<any>(null)
  const { galleryID } = useParams()
  const user = useContext(AuthContext)

  async function getGalleryData(id: any) {
    const docRef = doc(db, `users/${user!.uid}/galleries/${id}`)
    const docSnap = await getDoc(docRef)
    setCurrentGallery(docSnap.data())
  }
  
  useEffect(()=> {
    getGalleryData(galleryID)

  }, [])

  //20th Aug: Next steps - use grid system to control size of the gallery images

  
  return (
    <div>
      <h2 className="text-light">{currentGallery?.name}</h2>
      { currentGallery?.photos?.map((photo: any) => <Image src={photo.hdurl}/>) }
    </div>
  )
}

