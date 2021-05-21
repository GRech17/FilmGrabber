import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import Navbar from './components/Navbar';
import ApolloClient from 'apollo-boost';
import {Trending} from './pages/Trending';
import Header from "./components/Header";
import Footer from "./components/Footer";



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
        <Header/>
          <Switch>
            <Route exact path="/" component={Trending} />
            {/* <h1>-Test</h1> */}

          </Switch>
          <Footer />
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
