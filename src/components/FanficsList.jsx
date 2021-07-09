import Fanfic from "../containers/Fanfic";
import Notice from "./Notice";


const FanficsList = ({ fanfics, withControl = false, profile }) => {
  return (
    <div>
      {fanfics.length ? (
        fanfics.map(fanfic => (
          <Fanfic key={fanfic._id} fanficId={fanfic._id} controlIcons={withControl} profile={profile}  />
        ))
      ) : (
        <Notice heading="Fanfics not found" message="This user does not have any fanfics yet" />
      )}
    </div>
  );
};

export default FanficsList;