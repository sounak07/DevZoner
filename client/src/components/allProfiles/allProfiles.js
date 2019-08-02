import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../UI/Spinner/Spinner";
import { getAllProfiles } from "../../store/actions/profileAction";
import isEmpty from "../../validations/isEmpty";

class AllProfiles extends Component {
  componentDidMount() {
    this.props.getAllProfiles();
  }

  render() {
    let allProfiles = null;

    if (this.props.profiles) {
      allProfiles = this.props.profiles.map(profile => (
        <div key={profile._id} className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-2">
              <img
                className="rounded-circle"
                src={profile.user.avatar}
                alt=""
              />
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{profile.user.name}</h3>
              <p>
                {profile.status}{" "}
                {isEmpty(profile.company) ? null : `at ${profile.company}`}
              </p>
              <p>{isEmpty(profile.location) ? null : profile.location}</p>
              <Link to={`/${profile.handle}`} className="btn btn-info">
                View Profile
              </Link>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <h4>Skill Set</h4>
              <ul className="list-group">
                {profile.skills.splice(0, 4).map((sk, index) => (
                  <li key={index} className="list-group-item">
                    <i className="fa fa-check pr-1" />
                    {sk}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ));
    }
    return (
      <div>
        <div className="profiles">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4 text-center">Developer Profiles</h1>
                <p className="lead text-center">
                  Browse and connect with developers
                </p>
                {this.props.profiles ? null : <Spinner />}

                {allProfiles}
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
    profiles: state.profile.profiles
  };
};

export default connect(
  mapStateToProps,
  { getAllProfiles }
)(AllProfiles);
