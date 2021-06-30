import * as actions from './actions';
import { Thunk } from './storeTypes';
import { PastActivity, TechName } from '../shared/types';

export function saveActivity(pastActivity: PastActivity): Thunk {
  return async function saveActivityThunk(dispatch, getState, apiService) {
    const { user } = getState();

    dispatch(actions.saveActivityRequest(pastActivity));

    try {
      if (!user) {
        throw new Error('not logged in');
      }
      const updatedUser = await apiService.saveActivity(pastActivity, user);
      if (updatedUser) {
        dispatch(actions.saveActivitySuccess(updatedUser));
      }
    } catch (error) {
      dispatch(actions.saveActivityFailure(error));
    }
  };
}

export function learnTech(techName: TechName): Thunk {
  return async function learnTechThunk(dispatch, getState, apiService) {
    const { user } = getState();

    dispatch(actions.learnTechRequest(techName));

    try {
      if (!user) {
        throw new Error('not logged in');
      }
      const updatedUser = await apiService.learnTech(techName, user);
      if (updatedUser) {
        dispatch(actions.learnTechSuccess(updatedUser));
        dispatch(actions.decreasePointsToAssign());
      }
    } catch (error) {
      dispatch(actions.learnTechFailure(error));
    }
  };
}

export function getUserData(username: string): Thunk {
  return async function getUserDataThunk(dispatch, getState, apiService) {
    dispatch(actions.getUserDataRequest(username));

    // just so es-lint does not complain
    getState();

    try {
      const user = await apiService.getUserData(username);
      if (user !== null) {
        dispatch(actions.getUserDataSuccess(user));
      } else {
        throw new Error('something wrong with the API');
      }
    } catch (error) {
      dispatch(actions.getUserDataFailure(error));
    }
  };
}

// export function login(credentials: UserCredentials): Thunk {
//   return async function (dispatch, getState, apiService) {
//     dispatch(actions.loginRequest(credentials));

//     // just so es-lint does not complain
//     getState();

//     try {
//       // TODO: remove any for user
//       const user = await apiService.login(credentials);
//       dispatch(actions.loginSuccess(user));
//     } catch (error) {
//       dispatch(actions.loginFailure(error));
//     }
//   };
// }

// export function register(credentials: UserCredentials): Thunk {
//   return async function (dispatch, getState, apiService) {
//     dispatch(actions.registerRequest(credentials));

//     // just so es-lint does not complain
//     getState();

//     try {
//       // TODO: remove any for user
//       const user = await apiService.register(credentials);
//       dispatch(actions.registerSuccess(user));
//     } catch (error) {
//       dispatch(actions.registerFailure(error));
//     }
//   };
// }
