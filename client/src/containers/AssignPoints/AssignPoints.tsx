import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './AssignPoints.module.scss';
import { useAppDispatch, useAppSelector } from '../../store';
import { TechName, UserGameData } from '../../shared/types';
import { learnTech } from '../../store/thunks';
import NavButtonAssignToSchedule from '../../components/NavButtonAssignToSchedule';

import { assignCards, buttonAllowed } from './helpers';
import { fakeState, FakeState } from './localUtils';

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

  function onIconClick(techName: TechName) {
    if (pointsToAssign > 0) {
      dispatch(learnTech(techName));
      // check if hitory got length
      // if (userHistory[userHistory.length - 1].name !== 'assessment') {
      //   // rewrite history
      // }
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
  }, [pointsToAssign, redirectionAllowed]);

  useEffect(() => {
    if (buttonAllowed(level, techExperience, pointsToAssign)) {
      setRedirectionAllowed(true);
    }
  }, [pointsToAssign]);

  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        {leftCard}
        {middleCard}
        {rightCard}
      </div>
      <NavButtonAssignToSchedule
        moveToSchedule={moveToSchedule}
        redirectionAllowed={redirectionAllowed}
      />
    </div>
  );
};

export default AssignPoints;
