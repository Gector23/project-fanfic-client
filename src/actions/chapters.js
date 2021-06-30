import api from "../utils/api";

import { CHAPTER_FETCH, CHAPTER_SUCCESS, CHAPTER_FAILURE, REMOVE_CHAPTER } from "../constants/chapters";
import { REMOVE_FANFIC } from "../constants/fanfics";

export const getChapter = (chapterId, lastUpdate) => {
  return async dispatch => {
    try {
      if (lastUpdate) {
        const lastUpdateResponse = await api.get(`/chapter/last-update/${chapterId}`);
        if (lastUpdateResponse.data.lastUpdate === lastUpdate) {
          return;
        }
      }
      dispatch({ type: CHAPTER_FETCH, payload: { chapterId } });
      const chapterResponse = await api.get(`/chapter/${chapterId}`);
      dispatch({
        type: CHAPTER_SUCCESS, payload: {
          chapterId,
          message: chapterResponse.data.message,
          data: chapterResponse.data.chapter
        }
      });
    } catch (err) {
      dispatch({
        type: CHAPTER_FAILURE, payload: {
          chapterId,
          message: err.response.data.message
        }
      });
    }
  };
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
        type: REMOVE_CHAPTER, payload: {
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
        type: REMOVE_CHAPTER, payload: {
          chapterId
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
};