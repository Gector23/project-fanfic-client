import Profile from "../containers/Profile";
import Notice from "./Notice";
import Pagination from "./Pagination";

const ProfilesList = ({ profiles, currentPage, maxProfiles, onPrevPage, onNextPage }) => {
  return (
    <div>
      {profiles.length ? (
        <>
          {profiles.map(profile => (
            <Profile key={profile._id} userId={profile._id} />
          ))}
          <Pagination
            prevDisabled={currentPage === "1"}
            nextDisabled={currentPage * 5 >= maxProfiles}
            onPrevClick={onPrevPage}
            onNextClick={onNextPage}
          />
        </>
      ) : (
        <Notice message="Profiles not found" />
      )}
    </div>
  );
};

export default ProfilesList;