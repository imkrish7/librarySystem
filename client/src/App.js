import React from 'react';
import './App.css';
import AppNavbar from './components/navbar';
import List from './components/list';
import InputForm from './components/newBook';
import Book from './components/book';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AppNavbar></AppNavbar>
          <Switch>
            <Route path="/books/add" exact component={InputForm} />
            <Route path="/books/list" exact component={List} />
            <Route path="/books/:id" component={ Book } />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
