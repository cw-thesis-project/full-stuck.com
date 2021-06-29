import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { PastActivity, TechName, User } from '../shared/types';

const { getAccessTokenSilently } = useAuth0();
const token = localStorage.getItem('token');
const apiUrl = '';

export async function getToken(): Promise<void> {
  try {
    const accessToken = await getAccessTokenSilently();
    localStorage.setItem('token', accessToken);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

export async function getUser(username: string): Promise<User | null> {
  try {
    const user: User = await axios.get(`${apiUrl}/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return user;
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