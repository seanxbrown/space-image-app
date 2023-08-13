import { Container } from "react-bootstrap"
import { formatDate } from "../../utils/utils";

interface IPhoto {

    imgObject: {
    
    "date": string;
    "explanation": string;
    "hdurl": string;
    "media_type": string;
    "service_version": string;
    "title": string;
    "url": string;
    }
      
}

export const Photo = ({imgObject}: IPhoto) => {
  return (
    <Container fluid>
        <header className="text-center">
            <h3 className="text-light">{imgObject.title}</h3>
            <h5 className="text-light">{formatDate(imgObject.date)}</h5>
        </header>
        <figure className="d-flex flex-column">
            <img src={imgObject.url} alt={imgObject.title} className="w-100 m-auto"/>
            <figcaption className="text-light mt-2">{imgObject.explanation}</figcaption>
        </figure>
    </Container>
  )
}
