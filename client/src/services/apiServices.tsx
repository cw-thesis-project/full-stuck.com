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
  } catch (u_u) {
    console.log(u_u);
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
  } catch (u_u) {
    console.log(u_u);
    return null;
  }
}

export async function saveActivity(
  activity: PastActivity,
  user: User
): Promise<User | null> {
  try {
    const updatedUser: User = await axios.post(
      `${apiUrl}/${username}`,
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
  } catch (u_u) {
    console.log(u_u);
    return null;
  }
}

export async function learnTech(
  techName: TechName,
  user: User
): Promise<User | null> {
  try {
    const increasedTechValue = user.gameData.techExperience[techName] + 1;
    const updatedUser: User = await axios.post(
      `${apiUrl}/${username}`,
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
  } catch (u_u) {
    console.log(u_u);
    return null;
  }
}

// apiUrl+`/${username}`,{method: 'POST',headers: {Accept:'application/json','Content-Type': 'application/json',Authorization:`Bearer ${token}`}})
// apiUrl+`/${username}`,{headers: {Accept:'application/json','Content-Type': 'application/json',Authorization:`Bearer ${token}`}})
