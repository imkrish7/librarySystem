import React, { Component } from "react";
import { connect } from "react-redux";
import { getBook } from "../actions/booksAction";
import "./newbook.css";

class editBook extends Component {
  state = { ...this.props.book };
  


componentDidMount() {
    this.props.getBook(this.props.match.id);
}


  handleChange = e => {
    // e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newItem = {
      name: this.state.name,
      description: this.state.description,
      genere: this.state.genere,
      rating: this.state.rating,
      author: this.state.author
    };
    this.props.addBook(newItem);
  };

  render() {
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
            id="genere"
            onChange={this.handleChange}
            value={this.state.genere}
            name="genere"
            required
          />
          <input
            type="number"
            placeholder="Enter rating"
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
          <input type="submit" value="ADD" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  books: state.books.book
});

export default connect(
  mapStateToProps,
  { getBook }
)(editBook);
