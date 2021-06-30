import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getToken } from '../../services/apiServices';
import { getUserData } from '../../store/thunks';
import { useAppDispatch, useAppSelector } from '../../store';

import { AppState } from '../../store/storeTypes';
import LearntTech from '../../components/LearntTech/index';
import createGreeting from './greeting';
import mockTechExperience from '../../components/LearntTech/mockdata';
import { Level, TechExperience } from '../../shared/types';
import { technologies } from '../../utils/utils';
import { TechAchievements } from '../../components/LearntTech/LearntTech';

export type levelMap = Record<Level, number>;

const levelToNumber: levelMap = {
  junior: 0,
  senior: 1,
  tutor: 2,
  CEO: 3,
};

const Dashboard = (): JSX.Element => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();

  const userStore = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  // updates the storage from the API on the first load.
  useEffect(() => {
    if (!isLoading && !userStore) {
      (async () => {
        await getToken(getAccessTokenSilently);
        const username: string = user?.['https://full-stuck.com/username'];
        dispatch(getUserData(username));
      })();
    }
  }, []);

  const greeting = createGreeting(userStore?.gameData.level);

  function createTechAchievements(
    userLevel: Level,
    techExperience: undefined | TechExperience
  ) {
    // create { level: number, isLocked: boolean} for each Tech
    const techAchievements = {};
    console.log(techExperience);
    Array.prototype.forEach.call(techExperience, (e) => console.log(e));
    return techAchievements;
  }
  console.log(userStore?.gameData.techExperience);
  createTechAchievements('senior', userStore?.gameData.techExperience);
  return user ? (
    <div>
      <div className="greeting">
        <h1>Hello, {userStore?.username ? userStore.username : 'coder'}</h1>
        <h2>{greetingMessage}</h2>
      </div>
      <LearntTech techAchievements={mockTechExperience} />
    </div>
  ) : (
    <></>
  );
};

export default Dashboard;
