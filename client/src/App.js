import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import Navbar from './components/Navbar';
import ApolloClient from 'apollo-boost';
import {Trending} from './pages/Trending';


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
            <Route exact path="/" component={Trending} />
            {/* <h1>-Test</h1> */}

          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
