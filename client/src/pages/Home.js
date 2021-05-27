import { useState, useEffect } from 'react';

import { Container, Row, Col, Form } from "react-bootstrap";
import debounce from "lodash-es/debounce";
import "./Home.css";
import { MovieCards } from "../components/MovieCards";
import { CustomPagination } from "../components/Pagination";
import { searchMovies, getTrending } from "../utils/movieRequests";

export const Home = () => {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    
    
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
    
    return (
        <>
            <Container className="displayMovie">
                <Row>
                    <Col>
                        <h3>Home</h3>
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                        <Form.Control type="input" placeholder="Search for a Movie" onChange={(event) => {
                            onSearchChange(event.target.value)
                        }} />
                    </Col>
                </Row>
                <Row>
                <MovieCards movies={movies}></MovieCards>
               
                
                <CustomPagination page={page} pageCount={pageCount} setPage={setPage} />
                </Row>
            </Container>
        </>
    )
}