import { useState } from "react";

import useUserFanfics from "../hooks/useUserFanfics";

import ListHeader from "./ListHeader";
import SortPanel from "./SortPanel";
import FanficsList from "./FanficsList";

const ProfileFanfics = ({ userId, fanficsType, onTitleButtonClick }) => {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState({ type: "name", direction: true });
  const userFanfics = useUserFanfics(userId, fanficsType);

  let sortedFanfics = userFanfics;

  if (filter !== "all") {
    sortedFanfics = sortedFanfics.filter(fanfic => fanfic.fandom === filter);
  }

  if (sort.type === "name") {
    sortedFanfics.sort((a, b) => {
      if (sort.direction) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }

  if (sort.type === "lastUpdate") {
    sortedFanfics.sort((a, b) => {
      if (sort.direction) {
        return new Date(b.lastUpdate) - new Date(a.lastUpdate);
      } else {
        return new Date(a.lastUpdate) - new Date(b.lastUpdate);
      }
    });
  }

  if (sort.type === "rating") {
    sortedFanfics.sort((a, b) => {
      if (sort.direction) {
        return b.rating - a.rating ;
      } else {
        return a.rating  - b.rating ;
      }
    });
  }

  const handleSortChange = type => {
    if (type === sort.type) {
      setSort({type, direction: !sort.direction});
    } else {
      setSort({type, direction: true});
    }
  };

  return (
    <div>
      <ListHeader heading={`User ${fanficsType}`} onHeaderButtonClick={onTitleButtonClick} />
      <SortPanel sort={sort} filter={filter} onSortChange={handleSortChange} onFilterChange={setFilter} />
      <FanficsList fanfics={sortedFanfics} withControl={true} profile={userId} />
    </div>
  );
};

export default ProfileFanfics;