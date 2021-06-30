import React from 'react';

import { AppState } from '../../store/storeTypes';
import LearntTech from '../../components/LearntTech/index';
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

const createGreeting = (level: Level | undefined) => {
  let greetingMessage = '';
  switch (level) {
    case 'junior':
      greetingMessage = "Let's GET Coding";
      break;
    case 'senior':
      greetingMessage = 'PUT your back into it';
      break;
    case 'tutor':
      greetingMessage = 'POST us a pun please';
      break;
    case 'CEO':
      greetingMessage = 'DELETE and start again';
      break;
    default:
      greetingMessage = '';
  }
  return greetingMessage;
};

function createTechAchievements(
  userLevel: Level,
  techExperience: TechExperience
) {
  // create { level: number, isLocked: boolean} for each Tech
  const techAchievements = {};

  Object.entries(techExperience).forEach(([tech, experienceLevel]) => {
    //
  });

  return techAchievements;
}

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

  const greetingMessage = createGreeting(userStore?.gameData.level);

  // WIP
  // createTechAchievements('senior', userStore?.gameData.techExperience);

  return user && userStore ? (
    <div>
      <div className="greeting">
        <h1>Hello, {userStore.username ? userStore.username : 'coder'}</h1>
        <h2>{greetingMessage}</h2>
      </div>
      <LearntTech techAchievements={mockTechExperience} />
    </div>
  ) : (
    <></>
  );
};

export default Dashboard;
