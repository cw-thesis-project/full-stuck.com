import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './AssignPoints.module.scss';
import { useAppDispatch, useAppSelector } from '../../store';
import { TechName, UserGameData } from '../../shared/types';
import { setActivityTopic } from '../../store/thunks';
import NavButtonAssignToSchedule from '../../components/NavButtonAssignToSchedule';

import { assignCards, buttonAllowed } from './helpers';
import { fakeState } from './localUtils';
import usePageTitle from '../../shared/usePageTitle';

const AssignPoints = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [leftCard, setLeftCard] = useState<JSX.Element>(<div>Pabeli</div>);
  const [middleCard, setMiddleCard] = useState<JSX.Element>(<div>Pabelow</div>);
  const [rightCard, setRightCard] = useState<JSX.Element>(<div>Pabelu</div>);
  const [redirectionAllowed, setRedirectionAllowed] = useState<boolean>(false);
  // // TODO: remove the fakeAppState useState in prod
  const showAll = false;

  const pointsToAssign = useAppSelector((state) => state.pointsToAssign);
  const user = useAppSelector((state) => state.user);
  const gameData: UserGameData = user ? user.gameData : fakeState.user.gameData;
  const { level } = gameData;
  const { techExperience } = gameData;
  const { history: userHistory } = gameData;

  usePageTitle('Game Over — Full Stuck');

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
      showAll,
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
      {leftCard}
      {middleCard}
      {rightCard}
      <div className={styles.footer}>
        <p className={styles.footerText}>
          Spend the points <br /> you have earned
        </p>
        <NavButtonAssignToSchedule
          moveToSchedule={moveToSchedule}
          redirectionAllowed={redirectionAllowed}
        />
        <p className={styles.footerText}>
          to improve <br />
          your knowledge!
        </p>
      </div>
    </div>
  );
};

export default AssignPoints;
