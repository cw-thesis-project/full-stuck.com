/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import {
  PastActivity,
  TechName,
  User,
  ApiResponse,
  Auth0User,
} from 'shared/types';
import { apiEndpoint, emptyUser } from 'shared/constants';
import { deepCopy } from 'shared/utils';

export async function getToken(
  getAccessTokenSilently: () => Promise<string>
): Promise<void> {
  if (localStorage.getItem('token') === null) {
    try {
      const accessToken = await getAccessTokenSilently();
      localStorage.setItem('token', accessToken);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }
}

export async function getUserData(auth0User: Auth0User): Promise<User | null> {
  const token = localStorage.getItem('token');
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const apiResponse: ApiResponse = await axios.get(apiEndpoint, { headers });
    if (apiResponse.data) {
      return apiResponse.data;
    }

    return await newGame(auth0User);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return null;
  }
}

export async function updateUser(user: User): Promise<User | null> {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const apiResponse: ApiResponse = await axios.post(apiEndpoint, user, {
      headers,
    });
    return apiResponse.data;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return null;
  }
}

export async function newGame(auth0User: Auth0User): Promise<User | null> {
  const newUser = deepCopy(emptyUser);
  newUser._id = auth0User.sub;
  newUser.username = auth0User?.nickname
    ? auth0User.nickname
    : auth0User?.name
    ? auth0User.name
    : auth0User?.email;
  return updateUser(newUser);
}

export async function learnTech(
  techName: TechName,
  user: User
): Promise<User | null> {
  const currentUserState = deepCopy(user);
  currentUserState.gameData.techExperience[techName] += 1;
  return updateUser(currentUserState);
}

export async function saveActivity(
  pastActivity: PastActivity,
  user: User
): Promise<User | null> {
  const currentUserState = deepCopy(user);
  currentUserState.gameData.history.push(pastActivity);
  return updateUser(currentUserState);
}

export async function changeActivityTopic(
  techName: TechName,
  user: User
): Promise<User | null> {
  const currentUserState = deepCopy(user);
  const { history } = currentUserState.gameData;
  history[history.length - 1].topic = techName;
  return updateUser(currentUserState);
}
