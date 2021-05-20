import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { getMovie } from "../utils/movieRequests";

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
    </>)
}