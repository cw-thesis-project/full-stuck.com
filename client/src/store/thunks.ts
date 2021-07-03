import * as actions from './actions';
import { Thunk } from './storeTypes';
import { Level, PastActivity, TechName, User } from '../shared/types';
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

export function newGame(username: string): Thunk {
  return async function newGameThunk(dispatch, getState, apiService) {
    const { user } = getState();

    dispatch(actions.newGameRequest(username));

    try {
      if (!user) {
        throw new Error('not logged in');
      }
      const updatedUser = await apiService.newGame(username);
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
        dispatch(actions.updateUserSuccess(newUser));
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
      console.log('updatedUser after learnTech in thunk', updatedUser);

      if (updatedUser) {
        dispatch(actions.decreasePointsToAssign());
        const { history } = updatedUser.gameData;
        if (history[history.length - 1].name !== 'assessment') {
          updatedUser = await apiService.changeActivityTopic(
            techName,
            updatedUser
          );
          console.log('updatedUser after changeActivityTopic', updatedUser);
        }
      }
      if (updatedUser) {
        dispatch(actions.setActivityTopicSuccess(updatedUser));
      } else throw new Error('something wrong with the API');
    } catch (error) {
      dispatch(actions.setActivityTopicFailure(error));
    }
  };
}
