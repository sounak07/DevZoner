import React, { Component } from "react";
import Spinner from "../UI/Spinner/Spinner";
import PostForm from "./PostForm";
import { connect } from "react-redux";

class Posts extends Component {
  render() {
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {/* {postContent} */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null)(Posts);
