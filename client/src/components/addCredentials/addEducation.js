import React, { Component } from "react";
import Input from "../UI/Input";
import TextArea from "../UI/TextArea";
import { Link, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class AddEducation extends Component {
  state = {
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
    disabled: false
  };

  submitHandler = event => {
    event.preventDefault();
    console.log("submit");
  };

  onCheck = () => {
    const current = this.state.disabled;
    const currentCheck = this.state.current;

    this.setState({
      disabled: !current,
      current: !currentCheck
    });
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { errors } = this.props.error;
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        {isAuthenticated ? null : <Redirect to="/login" />}

        <div className="add-experience">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <Link to="/dashboard" className="btn btn-light">
                  Go Back
                </Link>
                <h1 className="display-4 text-center">Add Experience</h1>
                <p className="lead text-center">
                  Add any education title that you have had in the past or
                  current
                </p>
                <small className="d-block pb-3">* = required fields</small>
                <form noValidate onSubmit={this.submitHandler}>
                  <Input
                    placeholder="* School"
                    name="school"
                    value={this.state.school}
                    onChange={this.onChange}
                    error={errors.school}
                  />
                  <Input
                    placeholder="* Degree"
                    name="degree"
                    value={this.state.degree}
                    onChange={this.onChange}
                    error={errors.degree}
                  />
                  <Input
                    placeholder="Field of Study"
                    name="fieldofstudy"
                    value={this.state.fieldofstudy}
                    onChange={this.onChange}
                    error={errors.fieldofstudy}
                  />
                  <h6>From Date</h6>
                  <Input
                    type="date"
                    value={this.state.from}
                    onChange={this.onChange}
                    error={errors.from}
                    name="from"
                  />
                  <h6>To Date</h6>
                  <Input
                    type="date"
                    value={this.state.to}
                    onChange={this.onChange}
                    error={errors.to}
                    disabled={this.state.disabled ? "disabled" : ""}
                    name="to"
                  />
                  <div className="form-check mb-4">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="current"
                      value={this.state.current}
                      checked={this.state.current}
                      onChange={this.onCheck}
                      id="current"
                    />
                    <label htmlFor="current" className="form-check-label">
                      Current School
                    </label>
                  </div>
                  <TextArea
                    placeholder=" Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                    error={errors.description}
                    info="Tell us about your field of study"
                  />
                  <input
                    type="submit"
                    value="Submit"
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
    error: state.error,
    profile: state.profile,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(withRouter(AddEducation));
