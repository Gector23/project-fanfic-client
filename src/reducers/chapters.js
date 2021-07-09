import cloneDeep from "lodash.clonedeep";

import * as chaptersConstants from "../constants/chapters";

const chapters = (state = [], action) => {
  let stateClone;
  let chapterIndex;
  switch (action.type) {
    case chaptersConstants.CHAPTER_FETCH:
      stateClone = cloneDeep(state);
      chapterIndex = stateClone.findIndex(chapter => chapter.data._id === action.payload.chapterId);
      if (~chapterIndex) {
        stateClone[chapterIndex] = {
          status: "fetch",
          data: { _id: action.payload.chapterId }
        };
      } else {
        stateClone.push({
          status: "fetch",
          data: { _id: action.payload.chapterId }
        });
      }
      return stateClone;

    case chaptersConstants.CHAPTER_SUCCESS:
      stateClone = cloneDeep(state);
      chapterIndex = stateClone.findIndex(chapter => chapter.data._id === action.payload.chapterId);
      stateClone[chapterIndex] = {
        status: "success",
        message: action.payload.message,
        data: action.payload.data,
        isLiked: action.payload.isLiked
      };
      return stateClone;

    case chaptersConstants.CHAPTER_FAILURE:
      stateClone = cloneDeep(state);
      chapterIndex = stateClone.findIndex(chapter => chapter.data._id === action.payload.chapterId);
      stateClone[chapterIndex] = {
        status: "failure",
        message: action.payload.message,
        data: { _id: action.payload.chapterId }
      };
      return stateClone;

    case chaptersConstants.TOGGLE_CHAPTER_LIKE:
      stateClone = cloneDeep(state);
      chapterIndex = stateClone.findIndex(chapter => chapter.data._id === action.payload.chapterId);
      if (stateClone[chapterIndex].isLiked) {
        stateClone[chapterIndex].isLiked = false;
        stateClone[chapterIndex].data.likesCount--;
      } else {
        stateClone[chapterIndex].isLiked = true;
        stateClone[chapterIndex].data.likesCount++;
      }
      return stateClone;

    case chaptersConstants.REMOVE_CHAPTER:
      stateClone = cloneDeep(state);
      return stateClone.filter(chapter => chapter.data._id !== action.payload.chapterId);

    default:
      return state;
  }
};

export default chapters;