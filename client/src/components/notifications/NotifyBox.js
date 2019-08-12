import React, { Component } from "react";
import NotifyItem from "./NotifyItem";
import { connect } from "react-redux";

class Notify extends Component {
  render() {
    const { id } = this.props.user;
    const notifyItems = this.props.posts.map(post => (
      <NotifyItem key={post._id} id={id} notifics={post.notifications} />
    ));

    return <div>{notifyItems}</div>;
  }
}

const mapStateToProps = state => {
  return {
    posts: state.post.posts,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(Notify);
