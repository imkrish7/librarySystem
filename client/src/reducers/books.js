import { GET_BOOKS, GET_BOOK, ADD_BOOK, EDIT_BOOK, DELETE_BOOK, BOOKS_LOADING } from '../actions/types';


const initialState = {
  books: [],
  book: {},
  loading: false,

};

export default function(state = initialState, action){
    switch(action.type){
        case GET_BOOKS:
            return {
                ...state,
                books: action.payload,
                loading: false
            };
        case DELETE_BOOK:
          return {
            ...state,
            books: state.books.filter(item => item._id !== action.payload )
          };
        case ADD_BOOK:
          return {
            ...state,
            books: [action.payload, ...state.books]
          };

        case GET_BOOK:
          return {
            ...state,
            books: [...state.books ],
            book:  action.payload
          };
        case EDIT_BOOK:
          return{
            ...state,
            book: {...action.payload}
          };
        case BOOKS_LOADING:
          return {
            ...state,
            loading: true
          };

        default:
            return state;
    }
}