/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { getToken } from '../../services/apiServices';
import { getUserData } from '../../store/thunks';
import { useAppDispatch, useAppSelector } from '../../store';
import LearntTech from '../../components/LearntTech/index';
import Roadmap from '../../components/Roadmap';
import { createTechAchievements, createGreeting } from './helpers';
import styles from './Dashboard.module.scss';
// import logo from '../../assets/icons/index';

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
    <div className={styles.screen}>
      {/* <img className={styles.bkg} src={logo.backgroundTestBlob} alt="bkg" /> */}
      <div className={styles.dashboardheader}>
        <h1>Hello, {userStore.username ? userStore.username : 'coder'}</h1>
        <h2>{greetingMessage}</h2>
      </div>
      <LearntTech techAchievements={userTechAchievements} />
      <div className={styles.roadmap}>
        <Roadmap userLevel={userStore.gameData.level} />
      </div>
      <div className={styles.scheduleBtn}>
        <Link to="/schedule">Schedule</Link>
      </div>
    </div>
  );
};

export default Dashboard;
