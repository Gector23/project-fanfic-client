import { forwardRef } from "react";
import Tags from "@yaireo/tagify/dist/react.tagify";

import useTags from "../hooks/useTags";

const settings = {
  maxTags: 5,
  placeholder: "Type tags",
  dropdown: {
    enabled: 0
  }
};

const TagField = forwardRef(({ initialTags }, ref) => {
  const tags = useTags();
  
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