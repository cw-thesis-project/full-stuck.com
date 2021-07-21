/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import usePageTitle from 'shared/usePageTitle';
import { useAppSelector } from 'store';
import { Loading } from 'components';
import { playSound } from 'services/audioService';
import LearntTech from './LearntTech/index';
import Roadmap from './Roadmap';
import { createTechAchievements, createGreeting } from './helpers';
import SmallAppLogo from './SmallAppLogo';
import styles from './Dashboard.module.scss';
import useDashboardAnimation from './useDashboardAnimation';

const Dashboard = (): JSX.Element => {
  const { user, logout } = useAuth0();
  const isLoading = useAppSelector((state) => state.loading);
  const userStore = useAppSelector((state) => state.user);
  usePageTitle('Dashboard — Full Stuck');
  useDashboardAnimation();

  function handleLogout(): void {
    playSound('buttonClick');
    logout({
      returnTo: 'https://full-stuck.com/#/',
    });
  }

  const userTechAchievements = createTechAchievements(
    userStore.gameData.level,
    userStore.gameData.techExperience
  );

  const greetingMessage = createGreeting(userStore.gameData.level);

  return (
    <div className={styles.screen}>
      {isLoading ? <Loading /> : null}
      <div className={styles.leftColumn}>
        <div className={styles.header}>
          <div className={styles.textContainer}>
            <div className={styles.title}>
              <h1 className={styles.pageTitle}>Hello, </h1>
              <h1 className={styles.username}>
                {userStore.username ? userStore.username : 'coder'}
              </h1>
            </div>
            <h2 className={styles.greeting}>{greetingMessage}</h2>
          </div>
          <button
            title="logout"
            className={styles.avatarContainer}
            onClick={handleLogout}
            type="button"
          >
            <img
              alt="avatar logo"
              className={styles.avatarIcon}
              src={user?.picture}
            />
          </button>
        </div>
        <div className={styles.learntTech}>
          <LearntTech techAchievements={userTechAchievements} />
        </div>
        <div className={styles.footer}>
          <p>Start learning new technologies</p>
          <Link
            to="/schedule"
            className={styles.button}
            title="schedule"
            onClick={() => playSound('buttonClick')}
          >
            Schedule
          </Link>
        </div>
      </div>
      <div className={styles.rightColumn}>
        <SmallAppLogo />
        <Roadmap userLevel={userStore.gameData.level} />
      </div>
    </div>
  );
};

export default Dashboard;
