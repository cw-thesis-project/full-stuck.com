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
  const [leftCard, setLeftCard] = useState<JSX.Element>(<div>Pabeli</div>);
  const [middleCard, setMiddleCard] = useState<JSX.Element>(<div>Pabelow</div>);
  const [rightCard, setRightCard] = useState<JSX.Element>(<div>Pabelu</div>);
  const [redirectionAllowed, setRedirectionAllowed] = useState<boolean>(false);
  const history = useHistory();
  // // TODO: remove the fakeAppState useState in prod
  const showAll = false;
  const dispatch = useAppDispatch();
  const appState = useAppSelector((state) => state);
  const { pointsToAssign } = appState;
  const gameData: UserGameData = appState.user
    ? appState.user.gameData
    : fakeState.user.gameData;
  const { level } = gameData;
  const { techExperience } = gameData;

  function onIconClick(techName: TechName) {
    if (pointsToAssign > 0) dispatch(learnTech(techName));
    if (buttonAllowed(level, techExperience, pointsToAssign)) {
      setRedirectionAllowed(true);
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
