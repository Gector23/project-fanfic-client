import { useState } from "react";
import ReactMde from "react-mde";

import ChapterRead from "./ChapterRead";

const ChapterEditor = ({ value, onChange }) => {
  const [selectedTab, setSelectedTab] = useState("write");

  return (
    <ReactMde
      value={value}
      onChange={onChange}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      toolbarCommands={[
        ["header", "bold", "italic", "strikethrough"],
        ["quote", "code"],
        ["unordered-list", "ordered-list"]
      ]}
      generateMarkdownPreview={markdown =>
        Promise.resolve(<ChapterRead content={markdown} />)
      }
    />
  );
};

export default ChapterEditor;