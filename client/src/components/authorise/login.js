import React, { Component } from "react";

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

    console.log(data);
  };

  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.submitHandler}>
                <div className="form-group">
                  <input
                    type="email"
                    value={this.state.email}
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    onChange={this.inputHandler}
                    name="email"
                  />
                </div>
                <div className="form-group">
                  <input
                    value={this.state.password}
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    onChange={this.inputHandler}
                    name="password"
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

export default Login;
