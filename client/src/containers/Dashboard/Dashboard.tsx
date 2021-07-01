/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getToken } from '../../services/apiServices';
import { getUserData } from '../../store/thunks';
import { useAppDispatch, useAppSelector } from '../../store';
import LearntTech from '../../components/LearntTech/index';
import { createTechAchievements, createGreeting } from './helpers';

const Dashboard = (): JSX.Element => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();
  const userStore = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(storeTokenAndUser, []);

  function storeTokenAndUser() {
    if (!isLoading && !userStore) {
      (async () => {
        await getToken(getAccessTokenSilently);
        const username: string = user?.['https://full-stuck.com/username'];
        dispatch(getUserData(username));
      })();
    }
  }

  if (!userStore) {
    return <div>fetching user data...</div>;
  }

  const userTechAchievements = createTechAchievements(
    userStore.gameData.level,
    userStore.gameData.techExperience
  );

  const greetingMessage = createGreeting(userStore.gameData.level);

  return (
    <div>
      <div className="greeting">
        <h1>Hello, {userStore.username ? userStore.username : 'coder'}</h1>
        <h2>{greetingMessage}</h2>
      </div>
      <LearntTech techAchievements={userTechAchievements} />
    </div>
  );
};

export default Dashboard;
