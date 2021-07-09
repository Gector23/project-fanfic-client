import { Button, Dropdown, DropdownButton } from "react-bootstrap";

import useFandoms from "../hooks/useFandoms";

import { ReactComponent as UpArrowIcon } from "../icons/arrow-up-short.svg";
import { ReactComponent as DownArrowIcon } from "../icons/arrow-down-short.svg";

const SortPanel = ({ sort, filter, onSortChange, onFilterChange }) => {
  const fandoms = useFandoms();

  return (
    <div className="d-flex flex-column flex-md-row justify-content-between mb-2">
      <Button
        className="mb-1 mb-md-0"
        variant={sort.type !== "name" ? "outline-primary" : "primary"}
        onClick={() => onSortChange("name")}
      >
        Name
        {sort.type !== "name" ? <DownArrowIcon /> : sort.direction ? <DownArrowIcon /> : <UpArrowIcon />}
      </Button>
      <Button
        className="mb-1 mb-md-0"
        variant={sort.type !== "lastUpdate" ? "outline-primary" : "primary"}
        onClick={() => onSortChange("lastUpdate")}
      >
        Update Date
        {sort.type !== "lastUpdate" ? <DownArrowIcon /> : sort.direction ? <DownArrowIcon /> : <UpArrowIcon />}
      </Button>
      <Button
        className="mb-1 mb-md-0"
        variant={sort.type !== "rating" ? "outline-primary" : "primary"}
        onClick={() => onSortChange("rating")}
      >
        Rating
        {sort.type !== "rating" ? <DownArrowIcon /> : sort.direction ? <DownArrowIcon /> : <UpArrowIcon />}
      </Button>
      <DropdownButton title="Fandom" variant="outline-primary">
        <Dropdown.Item
          active={filter === "all"}
          eventKey="all"
          onSelect={eventKey => onFilterChange(eventKey)}
        >
          All
        </Dropdown.Item>
        <Dropdown.Divider />
        {fandoms.map(fandom => {
          return (
            <Dropdown.Item
              key={fandom._id}
              eventKey={fandom._id}
              active={filter === fandom._id}
              onSelect={eventKey => onFilterChange(eventKey)}
            >
              {fandom.name}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    </div>
  );
};

export default SortPanel;