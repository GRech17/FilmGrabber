import { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";

import { MovieCards } from "../components/MovieCards";
import { getTrending } from "../utils/movieRequests";
import { CustomPagination } from "../components/Pagination";

export const Trending = () => {
    const [movies, setMovies] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchMovies = async () => {
            const { results, total_pages } = await getTrending(page)

            setMovies(results);
            setPageCount(total_pages);
        }
        
        fetchMovies();
    }, [page, setPageCount, setMovies]);

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h3>Trending</h3>
                    </Col>
                </Row>

                <MovieCards movies={movies}></MovieCards>
                
                <CustomPagination page={page} pageCount={pageCount} setPage={setPage} />
            </Container>
        </>
    )
}