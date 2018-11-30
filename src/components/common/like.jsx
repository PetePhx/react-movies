import React from "react";

const Like = ({ isLiked, onLike }) => {
  const classes = isLiked ? "fa fa-heart" : "fa fa-heart-o";
  return (
    <i
      onClick={onLike}
      className={classes}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
    />
  );
};

export default Like;
