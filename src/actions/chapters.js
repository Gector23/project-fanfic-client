import api from "../utils/api";

import * as chaptersConstants from "../constants/chapters";
import { REMOVE_FANFIC } from "../constants/fanfics";

export const getChapter = chapterId => {
  return async dispatch => {
    try {
      dispatch({ type: chaptersConstants.CHAPTER_FETCH, payload: { chapterId } });
      const chapterResponse = await api.get(`/chapter/${chapterId}`);
      dispatch({
        type: chaptersConstants.CHAPTER_SUCCESS, payload: {
          chapterId,
          message: chapterResponse.data.message,
          data: chapterResponse.data.chapter,
          isLiked: chapterResponse.data.isLiked
        }
      });
    } catch (err) {
      dispatch({
        type: chaptersConstants.CHAPTER_FAILURE, payload: {
          chapterId,
          message: err.response.data.message
        }
      });
    }
  };
};

export const createChapter = (chapterData, fanficId) => {
  return async dispatch => {
    try {
      const response = await api.post("/chapter/create", {fanfic: fanficId, ...chapterData});
      dispatch({
        type: REMOVE_FANFIC, payload: {
          fanficId
        }
      });
      dispatch({
        type: chaptersConstants.CHAPTER_SUCCESS, payload: {
          chapterId: response.data.chapter._id,
          message: response.data.message,
          data: response.data.fanfic,
          isLiked: response.data.isLiked
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
};

export const updateChapter = (fanficId, chapterId, update) => {
  return async dispatch => {
    try {
      await api.patch(`/chapter/update/${chapterId}`, update);
      dispatch({
        type: REMOVE_FANFIC, payload: {
          fanficId
        }
      });
      dispatch({
        type: chaptersConstants.REMOVE_CHAPTER, payload: {
          chapterId
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const toggleChapterLike = (chapterId, isLiked) => {
  return async dispatch => {
    try {
      isLiked ? (
        await api.get(`/chapter/${chapterId}/unlike`)
      ) : (
        await api.get(`/chapter/${chapterId}/like`)
      )
      dispatch({
        type: chaptersConstants.TOGGLE_CHAPTER_LIKE, payload: {
          chapterId
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteChapter = (fanficId, chapterId) => {
  return async dispatch => {
    try {
      await api.delete(`/chapter/${chapterId}`);
      dispatch({
        type: REMOVE_FANFIC, payload: {
          fanficId
        }
      });
      dispatch({
        type: chaptersConstants.CHAPTER_DELETED, payload: {
          chapterId
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
};