import React, { Component } from "react";
import "./NotifyBox.css";

class NotifyBox extends Component {
  render() {
    return (
      <div className="popover__wrapper">
        <div className="popover__content">
          <ul className="list-group">
            <li className="list-group-item">Cras justo odio qwert dtwudtwu</li>
            <li className="list-group-item">Dapibus ac facilisis in</li>
            <li className="list-group-item">Morbi leo risus</li>
            <li className="list-group-item">Porta ac consectetur ac</li>
            <li className="list-group-item">Vestibulum at eros</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default NotifyBox;
