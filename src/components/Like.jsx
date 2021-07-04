import { useState } from "react";

import { ReactComponent as LikeIcon } from "../icons/heart.svg";
import { ReactComponent as LikeFillIcon } from "../icons/heart-fill.svg";

const Like = ({ isLiked, onLikeClick }) => {
  const [pointerOver, setPointerOver] = useState(false);

  let likeIcon;

  if (isLiked) {
    if (pointerOver) {
      likeIcon = <LikeIcon />;
    } else {
      likeIcon = <LikeFillIcon />;
    }
  } else {
    if (pointerOver) {
      likeIcon = <LikeFillIcon />;
    } else {
      likeIcon = <LikeIcon />;
    }
  }

  return (
    <div
      className="pointer"
      onClick={onLikeClick}
      onPointerOver={() => setPointerOver(true)}
      onPointerLeave={() => setPointerOver(false)}
    >
      {likeIcon}
    </div>
  );
};

export default Like;