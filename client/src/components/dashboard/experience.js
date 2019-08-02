import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteExperience } from "../../store/actions/profileAction";

class Experiences extends Component {
  onDelete = id => {
    this.props.deleteExperience(id);
  };

  render() {
    const experiences = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
          {exp.to == null ? (
            "Now"
          ) : (
            <Moment format="DD/MM/YYYY">{exp.to}</Moment>
          )}
        </td>

        <td>
          <button
            className="btn btn-danger"
            onClick={this.onDelete.bind(this, exp._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-2">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experiences}</tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  null,
  { deleteExperience }
)(Experiences);
