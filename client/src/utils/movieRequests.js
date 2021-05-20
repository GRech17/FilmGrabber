const baseUrl = "https://api.themoviedb.org/3/"
const trendingPath = "trending/movie/week";
const movieDetailPath = "movie/"

const getUrl = (path) => {
    return `${baseUrl}${path}?api_key=be7a826a76009582fd9bfd917bb48f21`
}

export const getTrending = async () => {
    const url = getUrl(trendingPath);
    const res = await (await fetch(url)).json();
    
    return res.results;
};

export const getMovie = async (id) => {
    const path = movieDetailPath + id;
    const url = getUrl(path);

    return (await fetch(url)).json();
};