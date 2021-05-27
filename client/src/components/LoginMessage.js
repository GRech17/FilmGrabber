export const LoginMessage = ({isLoggedIn}) => {
    if(isLoggedIn) {
        return <></>
    } else {
       return  <><h3>Login to create Watchlist</h3></>
    }
        
}