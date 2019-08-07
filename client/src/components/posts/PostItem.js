import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import {
  deletePost,
  addLike,
  removeLike
} from "../../store/actions/postAction";

class PostItem extends Component {
  removePost = id => {
    this.props.deletePost(id);
  };

  like = id => {
    this.props.addLike(id);
  };

  unlike = id => {
    this.props.removeLike(id);
  };

  findLike = likes => {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { post } = this.props;

    const { auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {this.props.showActions ? (
              <span>
                <button
                  onClick={this.like.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={this.unlike.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link
                  to={`post/${post._id}`}
                  style={{ color: "#055763" }}
                  className="btn"
                >
                  Comments{" "}
                  <span className="badge badge-light">
                    {post.comments.length}
                  </span>
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    type="button"
                    onClick={this.removePost.bind(this, post._id)}
                    style={{ color: "#dc3545" }}
                    className="btn"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
