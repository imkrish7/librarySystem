import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBooks, deleteBook } from '../actions/booksAction'
import PropTypes from 'prop-types';

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
            <ListGroup>
                { books.map(item=>{
                    return <ListGroupItem key={ item._id }> <Link to={`/books/${item._id}`} >${item.name}</Link><button onClick={ this.onDeleteClick.bind(this,item._id)}>Delete</button></ListGroupItem>
                }) }
            </ListGroup>
        )
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