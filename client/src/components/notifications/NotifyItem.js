import React, { Component } from "react";
import isEmpty from "../../validations/isEmpty";
import "./NotifyBox.css";

class NotifyItem extends Component {
  render() {
    let items;

    if (isEmpty(this.props.notifics)) {
      items = <li className="list-group-item">No Notifications!</li>;
    } else {
      items = this.props.notifics.splice(0, 7).map(noti => {
        if (noti.postOwner === this.props.id) {
          return (
            <li key={noti._id} className="list-group-item">
              {noti.name} likes your post.
            </li>
          );
        }
      });
    }

    return (
      <div className="popover__wrapper">
        <div className="popover__content">
          <ul className="list-group">{items}</ul>
        </div>
      </div>
    );
  }
}

export default NotifyItem;
