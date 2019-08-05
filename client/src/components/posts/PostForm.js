import React, { Component } from "react";
import { connect } from "react-redux";
import TextArea from "../UI/TextArea";
import { addPost } from "../../store/actions/postAction";

class Posts extends Component {
  state = {
    text: ""
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitHandler = event => {
    event.preventDefault();

    const { name, avatar } = this.props.auth.user;

    const data = {
      text: this.state.text,
      name: name,
      avatar: avatar
    };

    this.props.addPost(data);
    this.setState({ text: "" });
  };

  render() {
    const { errors } = this.props.error;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form noValidate onSubmit={this.submitHandler}>
              <div className="form-group">
                <TextArea
                  placeholder="Create a post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
                {errors && (
                  <div className="invalid-feedback">{errors.text}</div>
                )}
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
    auth: state.auth,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { addPost }
)(Posts);
