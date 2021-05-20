import { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";

export const Trending = () => {
    const url = "https://api.themoviedb.org/3/trending/movie/week?api_key=be7a826a76009582fd9bfd917bb48f21";

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchTrending = async () => {
            const res = await (await fetch(url)).json();

            console.log('Res: ', movies, res);

            setMovies(res.results);
        };
        fetchTrending();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (

        <>
            <Container>
                <Row>
                    <Col>
                        <h3>Trending</h3>
                    </Col>
                </Row>
                <Row>
                    {movies && movies.map((movie) =>
                        <Col key={movie.id} md="4" className="mb-2">
                            <Card>
                                <Card.Img variant="top" key={movie.id} src={ "https://image.tmdb.org/t/p/w500" + movie.poster_path } />
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                </Card.Body>

                            </Card>
                        </Col>
                    )}
                </Row>
            </Container>
        </>
    )
}