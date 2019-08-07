import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getPost } from "../../store/actions/postAction";
import Spinner from "../UI/Spinner/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { loading, post } = this.props.post;

    let postContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = <PostItem post={post} showActions={false} />;
    }

    return (
      <div>
        {!this.props.auth ? <Redirect to="/login" /> : null}
        <div className="container">
          {postContent}
          <CommentForm />
          <CommentFeed post={post} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.isAuthenticated,
    post: state.post
  };
};

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
