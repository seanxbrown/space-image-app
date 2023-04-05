import { Container, Button, ButtonGroup } from "react-bootstrap"

export const Search = () => {
  return (
    <Container>
      <h2 className="text-light">Search</h2>
      <ButtonGroup id="search-button-container" className="align-self-center">
        <Button className="btn btn-primary" role="button">Random Image</Button>
        <Button className="btn btn-primary ms-1" role="button">Today's Image</Button>

      </ButtonGroup>
      
    </Container>
  )
}
