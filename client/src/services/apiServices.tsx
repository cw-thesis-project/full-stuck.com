import axios from 'axios';
import { PastActivity, TechName, User, ApiResponse } from '../shared/types';
import { apiUrl, emptyUser } from '../shared/constants';
import { deepCopy } from '../shared/utils';

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

export async function getUserData(username: string): Promise<User | null> {
  const token = localStorage.getItem('token');
  try {
    const apiResponse: ApiResponse = await axios.get(
      `${apiUrl}/user/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return apiResponse.data.body;
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
    const apiResponse: ApiResponse = await axios.post(
      `${apiUrl}/user/${user.username}`,
      user,
      { headers }
    );
    return apiResponse.data.body;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return null;
  }
}

export async function newGame(username: string): Promise<User | null> {
  const newUser = deepCopy(emptyUser);
  newUser.username = username;
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
