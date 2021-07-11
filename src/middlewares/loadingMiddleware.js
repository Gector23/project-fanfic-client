import { START_LOADING, STOP_LOADING } from "../constants/loading";

const loadingMiddleware = store => {
  return next => async (action, { shouldHandleLoadingState, process } = {}) => {
    if (shouldHandleLoadingState) {
      store.dispatch({ type: START_LOADING, payload: { process } });
      await next(action);
      store.dispatch({ type: STOP_LOADING, payload: { process } });
    } else {
      next(action);
    }
  }
};

export default loadingMiddleware;