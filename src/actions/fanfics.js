import api from "../utils/api";

import { FANFIC_FETCH, FANFIC_SUCCESS, FANFIC_FAILURE, REMOVE_FANFIC } from "../constants/fanfics";

export const getFanfic = (fanficId, lastUpdate) => {
  return async dispatch => {
    try {
      if (lastUpdate) {
        const lastUpdateResponse = await api.get(`/fanfic/last-update/${fanficId}`);
        if (lastUpdateResponse.data.lastUpdate === lastUpdate) {
          return;
        }
      }
      dispatch({ type: FANFIC_FETCH, payload: { fanficId } });
      const fanficResponse = await api.get(`/fanfic/${fanficId}`);
      dispatch({
        type: FANFIC_SUCCESS, payload: {
          fanficId,
          message: fanficResponse.data.message,
          data: fanficResponse.data.fanfic,
          chapters: fanficResponse.data.chapters,
          userRate: fanficResponse.data.userRate
        }
      });
    } catch (err) {
      dispatch({
        type: FANFIC_FAILURE, payload: {
          fanficId,
          message: err.response.data.message
        }
      });
    }
  };
};

export const updateFanfic = (fanficId, update) => {
  return async dispatch => {
    try {
      await api.patch(`/fanfic/update/${fanficId}`, update);
      dispatch({
        type: REMOVE_FANFIC, payload: {
          fanficId
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const setFanficRate = (fanficId, value) => {
  return async dispatch => {
    try {
      await api.post(`/fanfic/${fanficId}/rate`, { value });
      dispatch({
        type: REMOVE_FANFIC, payload: {
          fanficId
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteFanfic = fanficId => {
  return async dispatch => {
    try {
      await api.delete(`/fanfic/${fanficId}`);
      dispatch({
        type: REMOVE_FANFIC, payload: {
          fanficId
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const moveChapter = (fanficId, chapterId, number) => {
  return async dispatch => {
    try {
      await api.patch(`/chapter/move/${chapterId}`, { number });
      dispatch({
        type: REMOVE_FANFIC, payload: {
          fanficId
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
};