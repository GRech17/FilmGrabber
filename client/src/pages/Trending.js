import { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import {useQuery} from '@apollo/react-hooks';

import { MovieCards } from "../components/MovieCards";
import { getTrending } from "../utils/movieRequests";
import { CustomPagination } from "../components/Pagination";
import {QUERY_ME} from '../utils/queries';

export const Trending = () => {
    const { loading, data, refetch } = useQuery(QUERY_ME);

    const [movies, setMovies] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);

    const userData = data?.me || {};

    useEffect(() => {
        const fetchMovies = async () => {
            const { results, total_pages } = await getTrending(page)

            setMovies(results);
            setPageCount(total_pages);
        }
        
        fetchMovies();
    }, [page, setPageCount, setMovies]);

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h3>Trending</h3>
                    </Col>
                </Row>

                <MovieCards movies={movies} savedMovies={userData?.savedMovies} refetch={refetch}></MovieCards>

                <CustomPagination page={page} pageCount={pageCount} setPage={setPage} />
            </Container>
        </>
    )
}