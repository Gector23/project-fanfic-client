import { forwardRef } from "react";
import { useSelector } from "react-redux";
import Tags from "@yaireo/tagify/dist/react.tagify";

const settings = {
  maxTags: 5,
  placeholder: "Type tags",
  dropdown: {
    enabled: 0
  }
};

const TagField = forwardRef(({ initialTags }, ref) => {
  const tags = useSelector(state => state.tags);
  
  return (
    <Tags
      settings={settings}
      tagifyRef={ref}
      whitelist={tags}
      value={initialTags}
    />
  );
});

export default TagField;