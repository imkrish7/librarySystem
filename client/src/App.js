import React, { Component } from 'react';
import AppNavbar from './components/navbar';
import List from './components/list';
import InputForm from './components/newBook';
import Edit from './components/edit';
import Book from './components/book';
import Admin from './components/admin';
import Index from "./components/index";
import UserList from './components/users';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class  App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }
  
  render(){
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AppNavbar></AppNavbar>
          <Switch>
            <Route path='/' exact component={ Index }  />
            <Route path="/admin" exact component={ Admin } />
            <Route path="/books/add" exact component={InputForm} />
            <Route path="/books/list" exact component={List} />
            <Route path="/books/:id" exact component={ Book } />
            <Route path="/books/:id/edit" component={ Edit } />
            <Route path="/user" exact component={ UserList } />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
  }
}

export default App;
