import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBooks, deleteBook } from '../actions/booksAction'
import PropTypes from 'prop-types';
import './styles/list.css';

class List extends Component{

    componentDidMount() {
        this.props.getBooks();
    }
    
    onDeleteClick = (id)=>{
        this.props.deleteBook(id);
    }

    render(){
        const { books } = this.props.books
        // console.log(books)
        return (
          <div className="booklist">
            <h1>Book List </h1>

            <table className="books">
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Author</th>
                  <th>Delete</th>
                </tr>
                {books.map(item => {
                  return (
                    <tr key={item._id}>
                      <td>
                        <Link to={`/books/${item._id}`}>{item.name}</Link>
                      </td>
                      <td> {item.author}</td>
                      <td>
                        <button
                          onClick={this.onDeleteClick.bind(this, item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
    }
}

List.propTypes = {
    getBooks: PropTypes.func.isRequired,
    books: PropTypes.object.isRequired
}
const mapStateToProps = (state)=>({
    books: state.books
})

export default connect(mapStateToProps, { getBooks, deleteBook })(List);