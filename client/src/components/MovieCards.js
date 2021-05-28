import { useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { MovieBookmark } from "./MovieBookmark";
import AuthService from "../utils/auth.js";
import {
  SAVE_MOVIE,
  REMOVE_MOVIE,
  SAVE_MOVIE_QUERY,
  REMOVE_MOVIE_QUERY,
} from "../utils/mutations.js";

export const MovieCards = ({ movies, savedMovies, refetch }) => {
  const [saveMovie] = useMutation(SAVE_MOVIE);
  const [removeMovie] = useMutation(REMOVE_MOVIE);

  const isLoggedIn = AuthService.loggedIn();

  useEffect(() => {
    window.addEventListener("movies_saved", refetch);
    window.addEventListener("movies_saved", () => {
      console.log("-- GOING ONLINE --");
    });

    return () => window.removeEventListener("movies_saved", refetch);
    // eslint-disable-next-line
  }, []);

  if (!movies || movies.length <= 0) {
    return <h3>No movies to show.</h3>;
  }

  console.log({ movies });

  const bookmarkClicked = async (index, isAddToWatchlist, movie) => {
    const { id, title, poster_path } = movie;

    const save = {
      variables: {
        movieData: {
          movieId: id,
          title,
          image: "https://image.tmdb.org/t/p/w500" + poster_path,
        },
      },
    };
    const remove = {
      variables: {
        movieId: id,
      },
    };

    const request = isAddToWatchlist
      ? () => saveMovie(save)
      : () => removeMovie(remove);

    try {
      await request();
      refetch();
    } catch (e) {
      const data = isAddToWatchlist
        ? {
            ...save,
            query: SAVE_MOVIE_QUERY,
          }
        : {
            ...remove,
            query: REMOVE_MOVIE_QUERY,
          };

      console.log({ data });
      window.save(data);
      movies[index] = movie;
    }
  };

  return (
    <>
      <Row>
        {movies.map((movie, index) => (
          <Col key={movie.id} md="3" className="mb-2">
            <Link to={"/movies/" + movie.id}>
              <Card>
                <Card.Img
                  variant="top"
                  key={movie.id}
                  src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <MovieBookmark
                    isLoggedIn={isLoggedIn}
                    movie={movie}
                    savedMovieIds={savedMovies?.map((film) => film.movieId)}
                    bookmarkClicked={bookmarkClicked.bind(null, index)}
                  />
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};
