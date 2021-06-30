import ReactMarkdown from "react-markdown";

const ChapterRead = ({ content }) => {
  return (
    <div>
      <ReactMarkdown children={content} />
    </div>
  );
};

export default ChapterRead;