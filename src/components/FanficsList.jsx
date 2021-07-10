import Fanfic from "../containers/Fanfic";
import Notice from "./Notice";
import Pagination from "./Pagination";


const FanficsList = ({ fanfics, currentPage, maxFanfics, onPrevPage, onNextPage, withControl = false }) => {
  return (
    <div>
      {fanfics.length ? (
        <>
          {fanfics.map(fanfic => (
            <Fanfic key={fanfic._id} fanficId={fanfic._id} controlIcons={withControl} />
          ))}
          <Pagination
            prevDisabled={currentPage === "1"}
            nextDisabled={currentPage * 5 >= maxFanfics}
            onPrevClick={onPrevPage}
            onNextClick={onNextPage}
          />
        </>
      ) : (
        <Notice heading="Fanfics not found" message="This user does not have any fanfics yet" />
      )}
    </div>
  );
};

export default FanficsList;