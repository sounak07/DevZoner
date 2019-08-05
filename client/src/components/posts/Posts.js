import React, { Component } from "react";
import Spinner from "../UI/Spinner/Spinner";
import PostForm from "./PostForm";
import { connect } from "react-redux";
import { getPosts } from "../../store/actions/postAction";
import PostFeed from "./PostFeed";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;

    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {this.props.auth ? <PostForm /> : null}
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    post: state.post,
    auth: state.auth.isAuthenticated
  };
};

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
