import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addBook } from '../actions/booksAction';
import { Link } from 'react-router-dom';
import './styles/newbook.css';

class newBook extends Component{
   
    state = {
        name: "",
        description: "",
        genre: "",
        rating: "",
        author: ""
    }

handleChange =(e)=>{
// e.preventDefault();
this.setState({
    [e.target.name]: e.target.value
})
}

handleSubmit = (e)=>{
    e.preventDefault();
    const newItem = {
        name: this.state.name,
        description: this.state.description,
        genre: this.state.genre,
        rating: this.state.rating,
        author: this.state.author
    }
    this.props.addBook(newItem);

    this.setState({
      name: "",
      description: "",
      genre: "",
      rating: "",
      author: ""
    });
}

    render(){

    return (
      <div className="add">
        <h1>Add New Book</h1>
        <form className="addform" method="POST" onSubmit={this.handleSubmit}>
          <input
            placeholder="Enter Book Name..."
            id="name"
            onChange={this.handleChange}
            value={this.state.name}
            name="name"
            required
          />
          <textarea
            placeholder="Enter book description"
            onChange={this.handleChange}
            value={this.state.description}
            rows="4"
            cols="50"
            id="desc"
            name="description"
            required
          ></textarea>
          <input
            placeholder="Enter Book Genere..."
            id="genre"
            onChange={this.handleChange}
            value={this.state.genre}
            name="genre"
            required
          />
          <input
            type="number"
            placeholder="Enter rating"
            value={this.state.rating}
            onChange={this.handleChange}
            id="rating"
            name="rating"
            min="1"
            max="5"
            required
          />
          <input
            type="text"
            value={this.state.author}
            name="author"
            onChange={this.handleChange}
            placeholder="Enter author name"
            required
          />
          <input type="submit" value="ADD" />
        </form>
        <Link to={`/admin`}>
          <button>Cancel</button>
        </Link>
      </div>
    );
    }
}

const mapStateToProps = state =>({
    books: state.books
})

export default connect( mapStateToProps, { addBook })(newBook)
