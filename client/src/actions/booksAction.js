import axios from 'axios';
import { GET_BOOKS, GET_BOOK, ADD_BOOK, EDIT_BOOK, DELETE_BOOK, BOOKS_LOADING } from './types';

export const getBooks = ()=> dispatch =>{

    dispatch(setBookLoading());

    axios
        .get('/api/books')
        .then(res => dispatch({
            type: GET_BOOKS,
            payload: res.data
        }))

}


export const deleteBook = (id)=> dispatch =>{


    axios
        .delete(`/api/books/delete/${id}`).then(res=> dispatch({
            type: DELETE_BOOK,
            payload: id
        }))
}


export const addBook = (book)=> dispatch =>{

    axios
        .post('/api/books/add',book)
        .then(res=> dispatch({
            type: ADD_BOOK,
            payload: res.data
        }))

   
}


export const getBook= (id)=> dispatch=>{
// console.log(id)

 dispatch(setBookLoading());
    axios
        .get(`/api/books/${id}`)
        .then(res=> dispatch({
            type: GET_BOOK,
            payload: res.data
        }))
}

// export const editBook = (book) => dispatch=>{

//     axios
//         .put(`/api/books/edit/`)
// }


export const setBookLoading = (book) =>{
    return {
        type: BOOKS_LOADING,
    }
}