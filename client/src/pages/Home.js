import { useState, useEffect } from 'react';

import { Container, Row, Col, Form } from "react-bootstrap";
import debounce from "lodash-es/debounce";
import {useQuery} from '@apollo/react-hooks';

import { MovieCards } from "../components/MovieCards";
import { CustomPagination } from "../components/Pagination";
import { searchMovies, getTrending } from "../utils/movieRequests";
import {QUERY_ME} from '../utils/queries';

export const Home = () => {
    const { loading, data, refetch } = useQuery(QUERY_ME);

    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);

    const userData = data?.me || {};
    
    useEffect(() => {
        const fetchMovies = async () => {
            if (!query) {
                const {results, total_pages} = await getTrending(page)
                setMovies(results);
                setPageCount(total_pages);
                return;
            }
            
            const res = await searchMovies(query, page);
            setMovies(res.results);
            setPageCount(res.total_pages);
        }

        fetchMovies();
    }, [query, page, setQuery, setPage, setMovies, setPageCount]);
    
    // Debounce change event & set query state
    const onSearchChange = debounce(async (value) => {
        setQuery(value);
    }, 300);

    if (loading) {
        return <div>Loading...</div>
    }
    
    return (
        <>
            <Container className="displayMovie">
                <Row>
                    <Col>
                        <h3>Login to create watchlist</h3>
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                        <Form.Control type="input" placeholder="Search for a Movie" onChange={(event) => {
                            onSearchChange(event.target.value)
                        }} />
                    </Col>
                </Row>

                <MovieCards movies={movies} savedMovies={userData?.savedMovies} refetch={refetch}></MovieCards>

                <CustomPagination page={page} pageCount={pageCount} setPage={setPage} />
              
            </Container>
        </>
    )
}