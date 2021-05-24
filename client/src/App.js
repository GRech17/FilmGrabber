import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import Navbar from './components/Navbar';
import ApolloClient from 'apollo-boost';
import {Trending} from './pages/Trending';
import {Movie} from './pages/Movie';
import Watchlist from './pages/Watchlist';
import { Home } from './pages/Home';

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
  uri: '/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
        <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/trending" component={Trending} />
            <Route exact path='/watchlist' component={Watchlist} />
            <Route exact path="/movies/:id" component={Movie} />

          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
