import { useState } from "react";

import { ReactComponent as StarIcon } from "../icons/star.svg";
import { ReactComponent as StarFillIcon } from "../icons/star-fill.svg";

const Rate = ({ userRate, onRate }) => {
  const [pointerRate, setPointerRate] = useState(null);

  let stars = [];

  for (let i = 0; i < 5; i++) {
    if (pointerRate) {
      if (pointerRate > i) {
        stars.push(
          <StarFillIcon
            key={i}
            onClick={() => onRate(i + 1)}
            onPointerOver={() => setPointerRate(i + 1)}
            onPointerLeave={() => setPointerRate(null)}
          />
        );
      } else {
        stars.push(
          <StarIcon
            key={i}
            onClick={() => onRate(i + 1)}
            onPointerOver={() => setPointerRate(i + 1)}
            onPointerLeave={() => setPointerRate(null)}
          />
        );
      }
    } else {
      if (userRate > i) {
        stars.push(
          <StarFillIcon
            key={i}
            onClick={() => onRate(i + 1)}
            onPointerOver={() => setPointerRate(i + 1)}
            onPointerLeave={() => setPointerRate(null)}
          />
        );
      } else {
        stars.push(
          <StarIcon
            key={i}
            onClick={() => onRate(i + 1)}
            onPointerOver={() => setPointerRate(i + 1)}
            onPointerLeave={() => setPointerRate(null)}
          />
        );
      }
    }
  }

  return (
    <div className="d-flex align-items-center pointer">
      {stars}
    </div>
  );
};

export default Rate;