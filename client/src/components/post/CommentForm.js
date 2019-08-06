import React, { Component } from "react";
import TextArea from "../UI/TextArea";
import { connect } from "react-redux";
import { postComment } from "../../store/actions/postAction";

class CommentForm extends Component {
  state = {
    comment: ""
  };
  submitHandler = event => {
    event.preventDefault();

    const { name, avatar } = this.props.auth.user;

    const { _id } = this.props.post.post;

    const data = {
      name: name,
      avatar: avatar,
      text: this.state.comment
    };
    this.props.postComment(_id, data);
    this.setState({ comment: "" });
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { errors } = this.props.errors;

    console.log(errors);

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form noValidate onSubmit={this.submitHandler}>
              <div className="form-group">
                <TextArea
                  placeholder="Say Something..."
                  name="comment"
                  value={this.state.comment}
                  onChange={this.onChange}
                  error={errors.comment}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.error,
    auth: state.auth,
    post: state.post
  };
};

export default connect(
  mapStateToProps,
  { postComment }
)(CommentForm);
