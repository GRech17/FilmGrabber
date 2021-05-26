import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card } from "react-bootstrap";
import { getMovie } from "../utils/movieRequests";
import "./Movie.css";
export const Movie = () => {
    let { id } = useParams();

    const [ movie, setMovie ] = useState();

    useEffect(() => {
        const fetchMovie = async () => {
            setMovie(await getMovie(id));
        }

        fetchMovie();
    }, [id, setMovie]);

    if (!movie) {
        return (<h3>Loading...</h3>)
    }

    return (<>
        <h3>{movie.title}</h3>
        <div className="float-container">
            <Card style={{ width: "auto", marginLeft: "4rem", marginRight: "4rem" }} className="movie-card">
                <Card.Img variant="top" src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
            </Card.Body>

            </Card>
            <div className="overview">
                <p id="overview-text">{movie.overview}</p>
                <p><br></br></p>
                <p className='info'>Release Date: {movie.release_date}</p>
                <p className='info'>Revenue: ${movie.revenue}</p>
                <p className='info'>Popularity: {movie.popularity}</p>
                <p className='info'>Runtime: {movie.runtime} minutes</p>
            </div>
        </div>
    </>)
}