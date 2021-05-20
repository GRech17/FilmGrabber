import { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";

import { MovieCards } from "../components/MovieCards";

export const Trending = () => {
    const url = "https://api.themoviedb.org/3/trending/movie/week?api_key=be7a826a76009582fd9bfd917bb48f21";

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchTrending = async () => {
            const res = await (await fetch(url)).json();

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

                <MovieCards movies={movies}></MovieCards>
            </Container>
        </>
    )
}