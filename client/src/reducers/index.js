import { combineReducers } from 'redux';
import booksReducer from './books';
import errorReducer from './errorReducer';
import authReducer from './authReducer';



export default combineReducers({
    books: booksReducer,
    error: errorReducer,
    auth: authReducer
})