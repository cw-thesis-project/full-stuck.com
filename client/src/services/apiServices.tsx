import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { PastActivity, TechName, User, UserFromDB } from '../shared/types';
import { apiUrl } from '../constants';

export async function getToken(
  getAccessTokenSilently: () => Promise<string>
): Promise<void> {
  try {
    const accessToken = await getAccessTokenSilently();
    localStorage.setItem('token', accessToken);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

export async function getUserData(username: string): Promise<User | null> {
  // eslint-disable-next-line no-console
  const token = localStorage.getItem('token');
  try {
    const apiResponse: UserFromDB = await axios.get(
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

export async function saveActivity(
  activity: PastActivity,
  user: User
): Promise<User> {
  const token = localStorage.getItem('token');
  const updatedUser: User = await axios.post(
    `${apiUrl}/${user.username}`,
    {
      ...user,
      history: user.gameData.history.push(activity),
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return updatedUser;
}

export async function learnTech(techName: TechName, user: User): Promise<User> {
  const token = localStorage.getItem('token');
  const increasedTechValue = user.gameData.techExperience[techName] + 1;
  const updatedUser: User = await axios.post(
    `${apiUrl}/${user.username}`,
    {
      ...user,
      techExperience: {
        ...user.gameData.techExperience,
        [techName]: increasedTechValue,
      },
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return updatedUser;
}
