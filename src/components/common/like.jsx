import React from "react";

const Like = props => {
  const classes = props.isLiked ? "fa fa-heart" : "fa fa-heart-o";
  return (
    <i
      onClick={props.onLike}
      className={classes}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
    />
  );
};

export default Like;
