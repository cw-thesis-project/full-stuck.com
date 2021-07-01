import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './AssignPoints.module.scss';
import { useAppDispatch, useAppSelector } from '../../store';
import { TechName, UserGameData } from '../../shared/types';
import { learnTech } from '../../store/thunks';

import { assignCards } from './helpers';
import { fakeState, FakeState } from './localUtils';
import TempTestZone from './TempTestZone/TempTestZone';

const AssignPoints = (): JSX.Element => {
  const [leftCard, setLeftCard] = useState<JSX.Element>(<div>Pabeli</div>);
  const [middleCard, setMiddleCard] = useState<JSX.Element>(<div>Pabelow</div>);
  const [rightCard, setRightCard] = useState<JSX.Element>(<div>Pabelu</div>);
  const history = useHistory();
  // // TODO: remove the fakeAppState useState in prod
  const [fakeAppState, setFakeAppState] = useState<FakeState>(fakeState);
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
  }

  function moveToSchedule() {
    if (pointsToAssign === 0) history.replace('/schedule');
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
  }, [pointsToAssign]);

  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        {leftCard}
        {middleCard}
        {rightCard}
        {showAll ? (
          <div className={styles.testZone}>
            <TempTestZone
              fakeAppState={fakeAppState}
              setFakeAppState={setFakeAppState}
            />
          </div>
        ) : null}
      </div>
      <div
        role="button"
        // eslint-disable-next-line no-console
        onKeyDown={() => console.log('hi buddy')}
        onClick={() => moveToSchedule()}
        tabIndex={0}
        className={`${styles.scheduleButton} ${
          pointsToAssign > 0 ? styles.inactiveBtn : styles.activeBtn
        }`}
      >
        <h2>Schedule</h2>
      </div>
    </div>
  );
};

export default AssignPoints;
