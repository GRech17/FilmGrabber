import { useState, useEffect } from 'react';

export const Trending = () => {
    const url = "https://api.themoviedb.org/3/trending/movie/week?api_key=be7a826a76009582fd9bfd917bb48f21";

    const [movies, setMovies] = useState([]);

    useEffect(async () => {
        const res = await (await fetch(url)).json();

        console.log('Res: ', movies, res);

        setMovies(res.results);
    }, []);

    return (
        <>
        <h1>Trending</h1>

        {movies && movies.map((movie) => {
            return <h3 key={movie.id}>{movie.title}</h3>
        })}
        </>
    )
}