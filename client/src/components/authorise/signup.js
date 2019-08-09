import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../store/actions/authAction";
import Input from "../UI/Input";

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
    const { errors, isAuthenticated } = this.props.auth;

    return (
      <div>
        {isAuthenticated ? this.props.history.push("/dashboard") : null}
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">Create your DevZone account</p>
                <form noValidate onSubmit={this.submitHandler}>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={this.inputHandler}
                    error={errors.name}
                    value={this.state.name}
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    onChange={this.inputHandler}
                    error={errors.signupEmail}
                    value={this.state.email}
                    info="This site uses Gravatar so if you want a profile image,
                    use a Gravatar email"
                  />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.inputHandler}
                    error={errors.signupPassword}
                    value={this.state.password}
                  />
                  <Input
                    type="password"
                    name="password2"
                    placeholder="Confirm Password"
                    onChange={this.inputHandler}
                    error={errors.password2}
                    value={this.state.password2}
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
    isAuth: state.auth.isAuthenticated,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
