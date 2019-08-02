import React, { Component } from "react";
import isEmpty from "../../validations/isEmpty";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;
    const fName = profile.user.name.trim().split(" ")[0];
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{fName}'s Bio</h3>
            {isEmpty(profile.bio) ? (
              `${fName} doesnot have a bio`
            ) : (
              <p className="lead">{profile.bio}</p>
            )}

            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {profile.skills.map((sk, index) => (
                  <div key={index} className="p-3">
                    <i className="fa fa-check" /> {sk}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileAbout;
