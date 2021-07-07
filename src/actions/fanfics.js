import api from "../utils/api";

import { FANFIC_FETCH, FANFIC_SUCCESS, FANFIC_FAILURE, REMOVE_FANFIC } from "../constants/fanfics";
import { REMOVE_PROFILE } from "../constants/profile";

export const createFanfic = (fanficData, userId) => {
  return async dispatch => {
    try {
      const response = await api.post("/fanfic/create", fanficData);
      dispatch({
        type: FANFIC_SUCCESS, payload: {
          fanficId: response.data.fanfic._id,
          message: response.data.message,
          data: response.data.fanfic,
          userRate: response.data.userRate
        }
      });
      dispatch({ type: REMOVE_PROFILE, payload: { userId } })
    } catch (err) {
      console.log(err);
    }
  }
};

export const getFanfic = fanficId => {
  return async dispatch => {
    try {
      dispatch({ type: FANFIC_FETCH, payload: { fanficId } });
      const fanficResponse = await api.get(`/fanfic/${fanficId}`);
      dispatch({
        type: FANFIC_SUCCESS, payload: {
          fanficId,
          message: fanficResponse.data.message,
          data: fanficResponse.data.fanfic.data,
          userRate: fanficResponse.data.fanfic.userRate
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