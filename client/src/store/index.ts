import * as appActions from './actions';
import * as thunks from './thunks';

export const actions = {
  learnTech: thunks.learnTech,
  saveActivity: thunks.saveActivity,
  getUserData: thunks.getUserData,
  // login: thunks.login,
  // register: thunks.register,
  decreasePointsToAssign: appActions.decreasePointsToAssign,
  setPointsToAssign: appActions.setPointsToAssign,
};

export { default as store } from './store';
