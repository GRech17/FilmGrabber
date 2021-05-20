import { Row, Col, Card } from "react-bootstrap";


export const MovieCards = ({ movies }) => {
    if (!movies || movies.length <= 0) {
        return (<h3>No movies to show.</h3>);
    }

    return (<>
            <Row>
                {movies.map((movie) =>
                    <Col key={movie.id} md="4" className="mb-2">
                        <Card>
                            <Card.Img variant="top" key={movie.id} src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />
                            <Card.Body>
                                <Card.Title>{movie.title}</Card.Title>
                            </Card.Body>

                        </Card>
                    </Col>
                )}
            </Row>
        </>
    )
}