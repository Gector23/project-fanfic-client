import { useState, useEffect } from "react";
import { useParams, useRouteMatch, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import hash from "object-hash";

import useFetchProfiles from "../hooks/useFetchProfiles";

import ProfilesList from "./ProfilesList";

const Profiles = () => {
  const [profilesHash, setProfilesHash] = useState("989db2448f309bfdd99b513f37c84b8f5794d2b5"); //hash of empty array
  const { currentPage } = useParams();
  const { path } = useRouteMatch();
  const history = useHistory();
  const profiles = useFetchProfiles(currentPage, profilesHash);
  const stateProfilesHash = useSelector(state => {
    const filteredSateProfiles = state.profiles.filter(stateProfile => (
      stateProfile.status !== "fetch" && profiles.data.find(profile => (
        profile._id === stateProfile.data._id
      ))
    ));
    return profiles.data.length && filteredSateProfiles.length !== profiles.data.length ? (
      profilesHash
    ) : (
      hash(filteredSateProfiles)
    );
  });

  useEffect(() => {
    setProfilesHash(stateProfilesHash);
  }, [stateProfilesHash]);

  const handlePrevPage = () => {
    history.push(path.replace(/:currentPage/, +currentPage - 1));
  };

  const handleNextPage = () => {
    history.push(path.replace(/:currentPage/, +currentPage + 1));
  };

  return (
    <div>
      <ProfilesList
        profiles={profiles.data}
        currentPage={currentPage}
        maxProfiles={profiles.maxUsers}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />
    </div>
  );
};

export default Profiles;