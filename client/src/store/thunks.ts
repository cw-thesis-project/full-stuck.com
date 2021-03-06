import * as actions from './actions';
import { Thunk } from './storeTypes';
import {
  Level,
  PastActivity,
  TechName,
  User,
  Auth0User,
} from '../shared/types';
import { deepCopy } from '../shared/utils';

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

export function newGame(auth0User: Auth0User): Thunk {
  return async function newGameThunk(dispatch, getState, apiService) {
    const { user } = getState();

    dispatch(actions.newGameRequest(auth0User));

    try {
      if (!user) {
        throw new Error('not logged in');
      }
      const updatedUser = await apiService.newGame(auth0User);
      if (updatedUser) {
        dispatch(actions.newGameSuccess(updatedUser));
      }
    } catch (error) {
      dispatch(actions.newGameFailure(error));
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

export function getUserData(auth0User: Auth0User): Thunk {
  return async function getUserDataThunk(dispatch, getState, apiService) {
    dispatch(actions.getUserDataRequest(auth0User));

    // just so es-lint does not complain
    getState();

    try {
      const user = await apiService.getUserData(auth0User);
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

export function levelUserUp(nextLevel: Level): Thunk {
  return async function levelUserUpThunk(dispatch, getState, apiService) {
    const { user } = getState();

    dispatch(actions.levelUserUpRequest(nextLevel));

    try {
      if (!user) {
        throw new Error('not logged in');
      }
      const userCopy = deepCopy(user);
      userCopy.gameData.level = nextLevel;

      const updatedUser = await apiService.updateUser(userCopy);

      if (updatedUser) {
        dispatch(actions.levelUserUpSuccess(updatedUser));
      }
    } catch (error) {
      dispatch(actions.levelUserUpFailure(error));
    }
  };
}
export function updateUser(newUser: User): Thunk {
  return async function levelUserUpThunk(dispatch, getState, apiService) {
    dispatch(actions.updateUserRequest(newUser));
    try {
      const updatedUser = await apiService.updateUser(newUser);
      if (updatedUser) {
        dispatch(actions.updateUserSuccess(updatedUser));
      } else {
        throw new Error('no response from API');
      }
    } catch (error) {
      dispatch(actions.updateUserFailure(error));
    }
  };
}

export function setActivityTopic(techName: TechName, user: User): Thunk {
  return async function setActivityTopicThunk(dispatch, getState, apiService) {
    dispatch(actions.setActivityTopicRequest(techName, user));

    // just so es-lint does not complain
    getState();

    try {
      let updatedUser = await apiService.learnTech(techName, user);
      if (updatedUser) {
        const { history } = updatedUser.gameData;
        if (history[history.length - 1].name !== 'assessment') {
          updatedUser = await apiService.changeActivityTopic(
            techName,
            updatedUser
          );
        }
      }
      if (updatedUser) {
        dispatch(actions.setActivityTopicSuccess(updatedUser));
        dispatch(actions.decreasePointsToAssign());
      } else throw new Error('something wrong with the API');
    } catch (error) {
      dispatch(actions.setActivityTopicFailure(error));
    }
  };
}
