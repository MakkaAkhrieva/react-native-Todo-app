import { CHANGE_SCREEN } from "../types";

export const screenReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_SCREEN:
      return action.payload;
    default:
      return state;
  }
};
