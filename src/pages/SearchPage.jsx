import { useLocation, useHistory, Redirect } from "react-router-dom";
import queryString from "query-string";

import useFanficSearch from "../hooks/useFanficSearch";

import FanficsList from "../components/FanficsList";

const SearchPage = () => {
  const { currentPage, searchString } = queryString.parse(useLocation().search);
  const history = useHistory();
  const fanfics = useFanficSearch(currentPage, searchString);

  if (!searchString) {
    return <Redirect to="/main" />;
  }
  if (!currentPage) {
    const query = queryString.stringify({
      currentPage: 1,
      searchString
    });
    return <Redirect to={`/search?${query}`} />;
  }

  const handlePrevPage = () => {
    const query = queryString.stringify({
      currentPage: +currentPage - 1,
      searchString
    });
    history.push(`/search?${query}`);
  };

  const handleNextPage = () => {
    const query = queryString.stringify({
      currentPage: +currentPage + 1,
      searchString
    });
    history.push(`/search?${query}`);
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

export default SearchPage;