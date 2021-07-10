import { useState, useEffect } from "react";
import { useParams, useRouteMatch, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import hash from "object-hash";

import useCommunityFanfics from "../hooks/useCommunityFanfics";

import FanficsList from "./FanficsList";

const CommunityFanfics = ({ sortField, preferences }) => {
  const [fanficsHash, setFanficsHash] = useState("989db2448f309bfdd99b513f37c84b8f5794d2b5"); //hash of empty array
  const { currentPage } = useParams();
  const { path } = useRouteMatch();
  const history = useHistory();
  const fanfics = useCommunityFanfics(sortField, currentPage, preferences, fanficsHash);
  const stateFanficsHash = useSelector(state => {
    const filteredSateFanfics = state.fanfics.filter(stateFanfic => (
      stateFanfic.status !== "fetch" && fanfics.data.find(fanfic => (
        fanfic._id === stateFanfic.data._id
      ))
    ));
    return fanfics.data.length && filteredSateFanfics.length !== fanfics.data.length ? (
      fanficsHash
    ) : (
      hash(filteredSateFanfics)
    );
  });

  useEffect(() => {
    setFanficsHash(stateFanficsHash);
  }, [stateFanficsHash]);

  const handlePrevPage = () => {
    history.push(path.replace(/:currentPage/, +currentPage - 1));
  };

  const handleNextPage = () => {
    history.push(path.replace(/:currentPage/, +currentPage + 1));
  };

  return (
    <div>
      <FanficsList
        fanfics={fanfics.data}
        currentPage={currentPage}
        maxFanfics={fanfics.maxFanfics}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />
    </div>
  );
};

export default CommunityFanfics;