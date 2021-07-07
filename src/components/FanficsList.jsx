import Fanfic from "../containers/Fanfic";
import Notice from "./Notice";


const FanficsList = ({ fanfics }) => {
  return (
    <div>
      {fanfics.length ? (
        fanfics.map(fanfic => <Fanfic key={fanfic._id} fanficId={fanfic._id} />)
      ) : (
        <Notice heading="Fanfics not found" message="This user does not have any fanfics yet" />
      )}
    </div>
  );
};

export default FanficsList;