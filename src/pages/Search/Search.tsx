import { Container, Button, ButtonGroup } from "react-bootstrap"
import { useState } from "react"

export const Search = () => {

  const [images, setImages] = useState([])

  async function getRandomImage() {

    try {

      const data = await fetch(`https://api.nasa.gov/planetary/apod?count=1&api_key=${import.meta.env.VITE_API_KEY}`)
      const useData = await data.json()
      console.log(useData)
      setImages(useData)
    } catch(e) {
      alert(e)
    }

    

  }

  return (
    <Container>
      <h2 className="text-light">Search</h2>
      <ButtonGroup id="search-button-container" className="align-self-center">
        <Button className="btn btn-primary" role="button" onClick={getRandomImage}>Random Image</Button>
        <Button className="btn btn-primary ms-1" role="button">Today's Image</Button>
      </ButtonGroup>
      
    </Container>
  )
}
