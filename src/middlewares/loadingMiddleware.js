import { START_LOADING, STOP_LOADING } from "../constants/loading";

const loadingMiddleware = store => {
  return next => async (action, { shouldHandleLoadingState } = {}) => {
    if (shouldHandleLoadingState) {
      store.dispatch({ type: START_LOADING });
      await next(action);
      store.dispatch({ type: STOP_LOADING });
    } else {
      next(action);
    }
  }
};

export default loadingMiddleware;