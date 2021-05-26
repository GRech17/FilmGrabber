import { BookmarkHeart, BookmarkHeartFill } from "react-bootstrap-icons"

export const MovieBookmark = ({isLoggedIn, savedMovieIds, movie, bookmarkClicked}) => {
    if(!isLoggedIn) {
       return  <></>
    }

    if (savedMovieIds?.some((savedMovieId) => savedMovieId === movie.id)) {
        return <BookmarkHeartFill size="24" onClick={(e) => { e.preventDefault();  bookmarkClicked(false, movie)}}></BookmarkHeartFill>
    } 

    return <BookmarkHeart size="24" onClick={(e) => { e.preventDefault(); bookmarkClicked(true, movie)}}></BookmarkHeart>
}