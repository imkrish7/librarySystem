import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { getBook } from '../actions/booksAction';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles/book.css';
const Book = (props) => {
 
    useEffect(()=>{
        props.getBook(props.match.params.id);
       
    },[ ])
    return (
      <div className="book">
        <ul className="desc">
          {Object.keys(props.book)
            .filter(item => item !== "_id" && item !== "__v")
            .map(item => (
              <li key={item}>{props.book[item]} </li>
            ))}
        </ul>
        <div className="buttons">
          <Link to={`/books/list`}>
            <button>Back</button>
          </Link>
          <Link to={`/books/${props.book._id}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
      </div>
    );
}

Book.propTypes = {
    getBook: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired
}

const mapStateToProps = (state)=>{
    // console.log(state.books.book)
    return { book: state.books.book }
}

export default connect(mapStateToProps, { getBook })(Book)
