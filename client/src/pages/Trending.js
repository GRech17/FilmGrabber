// import { useState, useEffect } from 'react';
// import { Container, Row, Col } from "react-bootstrap";

// import { MovieCards } from "../components/MovieCards";
// import { getTrending } from "../utils/movieRequests";


// export const Trending = () => {
//     const [movies, setMovies] = useState([]);

//     useEffect(() => {
//         const fetchMovies = async () => {
//             setMovies(await getTrending());
//         }
        
//         fetchMovies();
//     }, [setMovies]);

//     return (
//         <>
//             <Container>
//                 <Row>
//                     <Col>
//                         <h3>Trending</h3>
//                     </Col>
//                 </Row>

//                 <MovieCards movies={movies}></MovieCards>
//             </Container>
//         </>
//     )
// }