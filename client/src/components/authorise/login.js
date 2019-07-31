import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../store/actions/authAction";

class Login extends Component {
  state = {
    email: "",
    password: ""
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
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(data);
  };

  render() {
    const errors = this.props.errors;
    return (
      <div>
        {this.props.isAuth ? this.props.history.push("/dasboard") : null}
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">
                  Sign in to your DevZone account
                </p>
                <form noValidate onSubmit={this.submitHandler}>
                  <div className="form-group">
                    <input
                      type="email"
                      value={this.state.email}
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.email
                      })}
                      placeholder="Email Address"
                      onChange={this.inputHandler}
                      name="email"
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      value={this.state.password}
                      type="password"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.password
                      })}
                      placeholder="Password"
                      onChange={this.inputHandler}
                      name="password"
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
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
    errors: state.auth.errors,
    isAuth: state.auth.isAuthenticated
  };
};

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
