import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteComment } from "../../store/actions/postAction";

class CommentItem extends Component {
  deleteHandler = id => {
    this.props.deleteComment(id);
  };

  render() {
    const { name, avatar, text, user } = this.props.comment;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to="">
              <img
                className="rounded-circle d-none d-md-block"
                src={avatar}
                alt=""
              />
            </Link>
            <br />
            <p className="text-center">{name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{text}</p>
            {user === this.props.auth ? (
              <button
                style={{
                  color: "#dc3545",
                  position: "relative",
                  top: "-56px",
                  left: "500px"
                }}
                onClick={this.deleteHandler.bind(this, this.props.postId)}
                type="button"
                className="btn"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile.profile,
    auth: state.auth.user.id
  };
};

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
