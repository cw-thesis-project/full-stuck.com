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
import usePageTitle from '../../shared/usePageTitle';
import icons from '../../assets/icons';
import useDashboardAnimation from './useDashboardAnimation';

const Dashboard = (): JSX.Element => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();
  const userStore = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(storeTokenAndUser, []);
  usePageTitle('Dashboard — Full Stuck');
  useDashboardAnimation();

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
      <div className={styles.leftColumn}>
        <div className={styles.header}>
          <div className={styles.textContainer}>
            <div className={styles.title}>
              <h1>Hello, </h1>
              <h1 className={styles.username}>
                {userStore.username ? userStore.username : 'coder'}
              </h1>
            </div>
            <h2>{greetingMessage}</h2>
          </div>
          <img
            alt="avatar logo"
            className={styles.avatarIcon}
            src={icons.avatar}
          />
        </div>
        <div className={styles.learntTech}>
          <LearntTech techAchievements={userTechAchievements} />
        </div>
        <div className={styles.footer}>
          <p>Start learning new technologies</p>
          <Link to="/schedule" className={styles.button}>
            Schedule
          </Link>
        </div>
      </div>
      <div className={styles.rightColumn}>
        <div className={styles.logo}>
          <div className={styles.row}>
            <h1 className={styles.accent}>F</h1>
            <h1>U</h1>
            <h1>L</h1>
            <h1>L</h1>
            <h1 className={styles.accent}>_</h1>
          </div>
          <div className={styles.row}>
            <h1>S</h1>
            <h1>T</h1>
            <h1 className={styles.accent}>U</h1>
            <h1>C</h1>
            <h1>K</h1>
          </div>
        </div>
        <Roadmap userLevel={userStore.gameData.level} />
      </div>
    </div>
  );
};

export default Dashboard;
