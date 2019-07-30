import React, { Component } from "react";

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

    console.log(data);
  };

  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={this.submitHandler}>
                <div className="form-group">
                  <input
                    type="text"
                    onChange={this.inputHandler}
                    className="form-control form-control-lg"
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    onChange={this.inputHandler}
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    value={this.state.email}
                    name="email"
                  />
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    onChange={this.inputHandler}
                    className="form-control form-control-lg"
                    placeholder="Password"
                    value={this.state.password}
                    name="password"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    onChange={this.inputHandler}
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    value={this.state.password2}
                    name="password2"
                  />
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

export default Register;
