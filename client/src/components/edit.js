import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getBook, editBook } from "../actions/booksAction";
import "./styles/newbook.css";

class EditBook extends Component {
  
  state = {
    id:"",
    name: "",
    description: "",
    genere: "",
    rating: "",
    author: ""
  };

  componentDidMount() {
    this.props.getBook(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps){
     this.setState({
       id: newProps.book._id,
       name: newProps.book.name,
       description: newProps.book.description,
       genere: newProps.book.genere,
       rating: newProps.book.rating,
       author: newProps.book.author
     });
  }
  

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newItem = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      genere: this.state.genere,
      rating: this.state.rating,
      author: this.state.author
    };

    this.props.editBook(newItem);

    this.props.history.push(`/books/${this.state.id}`);
  };

  render() {
    return (
      <div className="add">
        <h1>Edit Book</h1>
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
            id="genere"
            onChange={this.handleChange}
            value={this.state.genere}
            name="genere"
            required
          />
          <input
            type="number"
            placeholder="Enter rating"
            min="1"
            max="5"
            value={this.state.rating}
            onChange={this.handleChange}
            id="rating"
            name="rating"
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
          <input type="submit" value="EDIT" />
        </form>
        <Link to={ `/books/${this.state.id}`}><button>Cancel</button></Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  book: state.books.book,
});

export default connect(
  mapStateToProps,
  { getBook,editBook }
)(EditBook);
