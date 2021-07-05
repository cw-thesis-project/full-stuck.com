import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './AssignPoints.module.scss';
import { useAppDispatch, useAppSelector } from '../../store';
import { TechName, UserGameData } from '../../shared/types';
import { setActivityTopic } from '../../store/thunks';
import NavButtonAssignToSchedule from '../../components/NavButtonAssignToSchedule';

import { assignCards, buttonAllowed } from './helpers';
import { fakeState } from './localUtils';
import useAssignPointsAnimation from './useAssignPointsAnimation';

const AssignPoints = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [leftCard, setLeftCard] = useState<JSX.Element>(<div>Pabeli</div>);
  const [middleCard, setMiddleCard] = useState<JSX.Element>(<div>Pabelow</div>);
  const [rightCard, setRightCard] = useState<JSX.Element>(<div>Pabelu</div>);
  const [redirectionAllowed, setRedirectionAllowed] = useState<boolean>(false);
  // // TODO: remove the fakeAppState useState in prod
  const pointsToAssign = useAppSelector((state) => state.pointsToAssign);
  const user = useAppSelector((state) => state.user);
  useAssignPointsAnimation();

  const gameData: UserGameData = user ? user.gameData : fakeState.user.gameData;
  const { level } = gameData;
  const { techExperience } = gameData;
  const { history: userHistory } = gameData;

  function onIconClick(techName: TechName) {
    if (pointsToAssign) {
      if (user) dispatch(setActivityTopic(techName, user));
    }
  }

  function moveToSchedule() {
    if (redirectionAllowed) history.replace('/schedule');
  }

  useEffect(() => {
    assignCards(
      level,
      setLeftCard,
      setMiddleCard,
      setRightCard,
      pointsToAssign,
      techExperience,
      onIconClick
    );
  }, [pointsToAssign, redirectionAllowed, level, userHistory]);

  useEffect(() => {
    if (buttonAllowed(level, techExperience, pointsToAssign)) {
      setRedirectionAllowed(true);
    }
  }, [pointsToAssign]);

  return (
    <div className={styles.screen}>
      <h1 className={styles.pageTitle}>Congratulations</h1>
      <div className={styles.card}>{leftCard}</div>
      <div className={styles.card}>{middleCard}</div>
      <div className={styles.card}>{rightCard}</div>
      <p className={styles.footerText}>Spend the points you have earned...</p>
      <div className={styles.scheduleButton}>
        <NavButtonAssignToSchedule
          moveToSchedule={moveToSchedule}
          redirectionAllowed={redirectionAllowed}
        />
      </div>
      <p className={styles.footerText}>...to improve your knowledge!</p>
    </div>
  );
};

export default AssignPoints;
