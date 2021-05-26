import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import {MovieBookmark} from './MovieBookmark';
import  AuthService  from '../utils/auth.js';
import {SAVE_MOVIE, REMOVE_MOVIE } from '../utils/mutations.js'


export const MovieCards = ({ movies, savedMovies, refetch }) => {
    const [saveMovie] = useMutation(SAVE_MOVIE);
    const [removeMovie] = useMutation(REMOVE_MOVIE);

    const isLoggedIn = AuthService.loggedIn()

    if (!movies || movies.length <= 0) {
        return (<h3>No movies to show.</h3>);
    }
    
    const bookmarkClicked = async (isAddToWatchlist, movie) => {
        const { id, title, poster_path } = movie

        if (isAddToWatchlist) {
            await saveMovie({
                variables: { 
                    movieData: {
                        movieId: id,
                        title,
                        image: "https://image.tmdb.org/t/p/w500" + poster_path
                    } 
                }
            })
        } else {
            await removeMovie({
                variables: {
                    movieId: id
                }
            })
        }

        refetch();
    }

    return (<>
            <Row>
                {movies.map((movie) =>
                    <Col key={movie.id} md="3" className="mb-2">
                        <Link to={"/movies/" + movie.id}>
                            <Card>
                                <Card.Img variant="top" key={movie.id} src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <MovieBookmark isLoggedIn={isLoggedIn} movie={movie} savedMovieIds={savedMovies?.map((film) => film.movieId)} bookmarkClicked={bookmarkClicked}/>
                                </Card.Body>

                            </Card>
                        </Link>
                    </Col>
                )}
            </Row>
        </>
    )
}