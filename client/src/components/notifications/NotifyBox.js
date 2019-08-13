import React, { Component } from "react";
import NotifyItem from "./NotifyItem";
import { connect } from "react-redux";
import { getNotifications } from "../../store/actions/postAction";

class Notify extends Component {
  componentDidMount() {
    this.props.getNotifications();
  }

  render() {
    const { id } = this.props.user;
    const { notifications } = this.props.notifications;

    let notifyItems = <NotifyItem id={id} notifics={notifications} />;

    return <div>{notifyItems}</div>;
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.post,
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  { getNotifications }
)(Notify);
