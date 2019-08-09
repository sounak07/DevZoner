import React, { Component } from "react";
import "./NotifyBox.css";

class NotifyBox extends Component {
  render() {
    return (
      <div class="popover__wrapper">
        <div class="popover__content">
          <ul class="list-group">
            <li class="list-group-item">Cras justo odio qwert dtwudtwu</li>
            <li class="list-group-item">Dapibus ac facilisis in</li>
            <li class="list-group-item">Morbi leo risus</li>
            <li class="list-group-item">Porta ac consectetur ac</li>
            <li class="list-group-item">Vestibulum at eros</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default NotifyBox;
