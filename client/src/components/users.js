import React, { Component } from "react";
import { connect } from "react-redux";
import { getBooks} from "../actions/booksAction";
import PropTypes from "prop-types";
import "./styles/list.css";
import "./styles/user.css";

class userList extends Component {

  state = {
    sort: "none",
    books: []

  }

  sortBook = ()=>{
     if (this.state.sort === "rating") {
       this.ratingSort();
     } else if (this.state.sort === "genre") {
       this.state.books.sort((a, b) => {
         if (a.genere > b.genere) {
           return 1;
         }
         if (a.genere < b.genere) {
           return -1;
         }
         return 0;
       });
     } else {
        this.state.books.sort((a, b) => {
          if (a._id > b._id) {
            return 1;
          }
          if (a._id < b._id) {
            return -1;
          }
          return 0;
        });
     }
  }
  componentWillReceiveProps(newProps){
     this.setState({
       books: [ ...newProps.books.books ]
     })


  }

  ratingSort = ()=>{
    
     this.state.books.sort((a, b) => {
       return a.rating - b.rating;
     });
  }


  handleChange = (e)=>{
   
    this.setState({
      sort: e.target.value
    })
     e.preventDefault();
  }
  componentDidMount(e) {
    this.props.getBooks();
  }

  render() {

    return (
      <div className="booklist">
        <div className="head">
          <div className="head-text">
            <h1>Book List </h1>
          </div>

          <div className="sorting">
            <form onSubmit={ this.sortBook() }>
              <select value={this.state.sort} onChange={this.handleChange}>
                <option value="none">Sort</option>
                <option value="rating">Rating</option>
                <option value="genre">Genre</option>
              </select>

              {/* <input type="submit" value="Sort" /> */}
            </form>
          </div>
        </div>

        <table className="books">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Genere</th>
              <th>Rating</th>
              <th>Author</th>
            </tr>
            {this.state.books.map(item => {
              return (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.genere}</td>
                  <td>{item.rating}</td>
                  <td>{item.author}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

userList.propTypes = {
  getBooks: PropTypes.func.isRequired,
  books: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  books: state.books
});

export default connect(
  mapStateToProps,
  { getBooks}
)(userList);
