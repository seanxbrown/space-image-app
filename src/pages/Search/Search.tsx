import { Container, Button, ButtonGroup } from "react-bootstrap"
import { useState } from "react"
import { Photo } from "./Photo"

export const Search = () => {

  const [photos, setPhotos] = useState<Object[] | undefined>([])

  async function getRandomImage() {

    try {

      const data = await fetch(`https://api.nasa.gov/planetary/apod?count=1&api_key=${import.meta.env.VITE_API_KEY}`)

      const photoData = await data.json()

      setPhotos(photoData)

    } catch(e) {
      alert(e)
    }

  }

  async function getTodaysImage() {

    const date = new Date().toJSON().slice(0,10)

    try {
      const data = await fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${import.meta.env.VITE_API_KEY}`)
      const photoData = await data.json()

      setPhotos([photoData])
    } catch(e) {
      alert(e)
    }
    
  }

  return (
    <Container>
      <h2 className="text-light">Search</h2>
      <ButtonGroup id="search-button-container" className="m-auto">
        <Button className="btn btn-primary" role="button" onClick={getRandomImage}>Random Image</Button>
        <Button className="btn btn-primary ms-1" role="button" onClick={getTodaysImage}>Today's Image</Button>
      </ButtonGroup>
      <Container id="search-results">
        {photos && photos.map((photo: any) => {
          return <Photo imgObject={photo} />
        })}
     
      </Container>
    </Container>
  )
}
