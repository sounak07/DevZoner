import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authAction";
import { clearProfile } from "../../store/actions/profileAction";

class Navbar extends Component {
  onLogOut = e => {
    e.preventDefault();
    this.props.logout();
    this.props.clearProfile();
  };

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            DevZone
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/profiles">
                  {" "}
                  Developers
                </NavLink>
              </li>
            </ul>
            {!this.props.auth ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/postfeed">
                    Post feed
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">
                    Signup
                  </NavLink>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/postfeed">
                    Post feed
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" onClick={this.onLogOut}>
                    <img
                      className="rounded-circle"
                      style={{ width: "25px", marginRight: "5px" }}
                      src={this.props.user.avatar}
                      alt={this.props.user.name}
                      title="You must have a Gravatar connected to your email to display an image"
                    />{" "}
                    Logout
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.isAuthenticated,
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  { logout, clearProfile }
)(Navbar);
