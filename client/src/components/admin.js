import React from "react";
import { Link } from "react-router-dom";
import "./styles/admin.css";

const index = () => {
  return (
    <div className="admin_dashboard">
      <div>
        <h1>Admin Dashboard</h1>
      </div>
      <div className="hero">
        <div className="admin">
          <Link to="/books/add">AddBook</Link>
        </div>
        <div className="user">
          <Link to="/books/list">BookList</Link>
        </div>
      </div>
    </div>
  );
};

export default index;
