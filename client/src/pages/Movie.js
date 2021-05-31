import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card } from "react-bootstrap";
import { getMovie } from "../utils/movieRequests";
import "./Movie.css";
export const Movie = () => {
  let { id } = useParams();

  const [movie, setMovie] = useState();

  useEffect(() => {
    const fetchMovie = async () => {
      setMovie(await getMovie(id));
    };

    fetchMovie();
  }, [id, setMovie]);

  if (!movie) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <section className="wrapper">
        <div className="container-fostrap">
          <div></div>
          <div className="content">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-sm-4">
                  <div className="card">
                    <Card style={{ width: "Auto" }} id="movie-card">
                      <Card.Img
                        className="image"
                        variant="top"
                        key={movie.id}
                        src={
                          "https://image.tmdb.org/t/p/w500" + movie.poster_path
                        }
                      />
                      <Card.Body className="body-title">
                        <Card.Title id="image-title">{movie.title}</Card.Title>
                      </Card.Body>
                    </Card>
                  </div>
                </div>

                <div className="col-xs-12 col-sm-8">
                  <div className="card" id="card1">
                    <h3 className="title">{movie.title}</h3>
                    <p id="overview-text">{movie.overview}</p>
                    <p>
                      <br></br>
                    </p>
                    <p>Release Date: {movie.release_date}</p>
                    <p>Revenue: ${movie.revenue}</p>
                    <p>Popularity: {movie.popularity}</p>
                    <p>Runtime: {movie.runtime} minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
