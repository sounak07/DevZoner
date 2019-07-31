import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../store/actions/authAction";
import Input from "../UI/Input";

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
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    onChange={this.inputHandler}
                    error={errors.email}
                    value={this.state.email}
                  />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.inputHandler}
                    error={errors.password}
                    value={this.state.password}
                  />
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
