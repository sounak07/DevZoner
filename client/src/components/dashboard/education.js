import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteEducation } from "../../store/actions/profileAction";

class Educations extends Component {
  onDelete = id => {
    this.props.deleteEducation(id);
  };

  render() {
    const educations = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
          {edu.to == null ? (
            "Now"
          ) : (
            <Moment format="DD/MM/YYYY">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={this.onDelete.bind(this, edu._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-2">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{educations}</tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteEducation }
)(Educations);
