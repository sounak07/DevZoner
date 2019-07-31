import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../store/actions/authAction";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: ""
  };

  inputHandler = event => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  };

  submitHandler = event => {
    event.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(data, this.props.history);
  };

  render() {
    const errors = this.props.errors;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevZone account</p>
              <form noValidate onSubmit={this.submitHandler}>
                <div className="form-group">
                  <input
                    type="text"
                    onChange={this.inputHandler}
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name
                    })}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    required
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    onChange={this.inputHandler}
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    value={this.state.email}
                    name="email"
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    onChange={this.inputHandler}
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    value={this.state.password}
                    name="password"
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    onChange={this.inputHandler}
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password2
                    })}
                    placeholder="Confirm Password"
                    value={this.state.password2}
                    name="password2"
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    errors: state.auth.errors
  };
};

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
