import cloneDeep from "lodash.clonedeep";

import { CHAPTER_FETCH, CHAPTER_SUCCESS, CHAPTER_FAILURE, REMOVE_CHAPTER } from "../constants/chapters";

const chapters = (state = [], action) => {
  let stateClone;
  let chapterIndex;
  switch (action.type) {
    case CHAPTER_FETCH:
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

    case CHAPTER_SUCCESS:
      stateClone = cloneDeep(state);
      chapterIndex = stateClone.findIndex(chapter => chapter.data._id === action.payload.chapterId);
      stateClone[chapterIndex] = {
        status: "success",
        message: action.payload.message,
        data: action.payload.data,
        isLiked: action.payload.isLiked
      };
      return stateClone;

    case CHAPTER_FAILURE:
      stateClone = cloneDeep(state);
      chapterIndex = stateClone.findIndex(chapter => chapter.data._id === action.payload.chapterId);
      stateClone[chapterIndex] = {
        status: "failure",
        message: action.payload.message,
        data: { _id: action.payload.chapterId }
      };
      return stateClone;

    case REMOVE_CHAPTER:
      stateClone = cloneDeep(state);
      return stateClone.filter(chapter => chapter.data._id !== action.payload.chapterId);

    default:
      return state;
  }
};

export default chapters;