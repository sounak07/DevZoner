import React, { Component } from "react";
import CommentItem from "./CommentItem";

class CommentFeed extends Component {
  render() {
    const { comments, _id } = this.props.post;

    let commentItems;

    if (comments && comments.length) {
      commentItems = comments.map(comment => (
        <CommentItem key={comment._id} postId={_id} comment={comment} />
      ));
    } else {
      commentItems = null;
    }

    return <div>{commentItems}</div>;
  }
}

export default CommentFeed;
