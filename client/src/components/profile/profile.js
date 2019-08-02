import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProfileHeader from "./profileHeader";
import ProfileCreds from "./profileCreds";
import ProfileGithub from "./profileGithub";
import ProfileAbout from "./profileAbout";
import Spinner from "../UI/Spinner/Spinner";
import profile from "../../store/reducers/profileReducer";
import { getProfileByHandle } from "../../store/actions/profileAction";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  render() {
    return (
      <div>
        <ProfileHeader />
        <ProfileAbout />
        <ProfileCreds />
        <ProfileGithub />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
