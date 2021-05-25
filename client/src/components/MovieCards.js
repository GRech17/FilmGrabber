import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BookmarkHeart, BookmarkHeartFill } from 'react-bootstrap-icons';
import { QUERY_ME } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/react-hooks';

export const MovieCards = ({ movies }) => {
    const { loading, data } = useQuery(QUERY_ME);

    if (!movies || movies.length <= 0) {
        return (<h3>No movies to show.</h3>);
    }
    
    console.log('Query data: ', loading, data);

    return (<>
            <Row>
                {movies.map((movie) =>
                    <Col key={movie.id} md="3" className="mb-2">
                        <Link to={"/movies/" + movie.id}>
                            <Card>
                                <Card.Img variant="top" key={movie.id} src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <BookmarkHeart size="24"></BookmarkHeart>
                                </Card.Body>

                            </Card>
                        </Link>
                    </Col>
                )}
            </Row>
        </>
    )
}