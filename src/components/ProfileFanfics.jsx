import { useState, useEffect } from "react";
import { useParams, useRouteMatch, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import hash from "object-hash";

import useUserFanfics from "../hooks/useUserFanfics";

import ListHeader from "./ListHeader";
import SortPanel from "./SortPanel";
import FanficsList from "./FanficsList";

const ProfileFanfics = ({ userId, fanficsType, onTitleButtonClick }) => {
  const [fanficsHash, setFanficsHash] = useState("989db2448f309bfdd99b513f37c84b8f5794d2b5"); //hash of empty array
  const { currentPage } = useParams();
  const { path } = useRouteMatch();
  const history = useHistory();
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState({ sortField: "name", direction: true });
  const userFanfics = useUserFanfics(userId, fanficsType, sort, currentPage, filter, fanficsHash);
  const stateFanficsHash = useSelector(state => {
    const filteredSateFanfics = state.fanfics.filter(stateFanfic => (
      stateFanfic.status !== "fetch" && userFanfics.data.find(fanfic => (
        fanfic._id === stateFanfic.data._id
      ))
    ));
    return userFanfics.data.length && filteredSateFanfics.length !== userFanfics.data.length ? (
      fanficsHash
    ) : (
      hash(filteredSateFanfics)
    );
  });

  useEffect(() => {
    setFanficsHash(stateFanficsHash);
  }, [stateFanficsHash]);

  const handleSortChange = sortField => {
    if (sortField === sort.sortField) {
      setSort({ sortField, direction: !sort.direction });
    } else {
      setSort({ sortField, direction: true });
    }
  };

  const handlePrevPage = () => {
    history.push(path.replace(/:userId/, userId).replace(/:currentPage/, +currentPage - 1));
  };

  const handleNextPage = () => {
    history.push(path.replace(/:userId/, userId).replace(/:currentPage/, +currentPage + 1));
  };

  return (
    <div>
      <ListHeader heading={`User ${fanficsType}`} onHeaderButtonClick={onTitleButtonClick} />
      <SortPanel sort={sort} filter={filter} onSortChange={handleSortChange} onFilterChange={setFilter} />
      <FanficsList
        fanfics={userFanfics.data}
        currentPage={currentPage}
        maxFanfics={userFanfics.maxFanfics}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        withControl={true}
      />
    </div>
  );
};

export default ProfileFanfics;