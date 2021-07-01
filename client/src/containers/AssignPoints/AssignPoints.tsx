import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './AssignPoints.module.scss';
import { useAppDispatch, useAppSelector } from '../../store';
import { TechName, UserGameData } from '../../shared/types';
import { learnTech } from '../../store/thunks';
import NavButtonAssignToSchedule from '../../components/NavButtonAssignToSchedule';

import { assignCards } from './helpers';
import { fakeState, FakeState } from './localUtils';
import TempTestZone from './TempTestZone/TempTestZone';

const AssignPoints = (): JSX.Element => {
<<<<<<< HEAD
  const [leftCard, setLeftCard] = useState<JSX.Element>(<div>Pabeli</div>);
  const [middleCard, setMiddleCard] = useState<JSX.Element>(<div>Pabelow</div>);
  const [rightCard, setRightCard] = useState<JSX.Element>(<div>Pabelu</div>);
  const history = useHistory();
  // // TODO: remove the fakeAppState useState in prod
  const [fakeAppState, setFakeAppState] = useState<FakeState>(fakeState);
  const showAll = false;
=======
  const history = useHistory();
>>>>>>> ff6c0b9 (feat: logic for navigation button to Schedule container)
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
<<<<<<< HEAD
=======
  }
            pointsToAssign,
            techExperience,
            onIconClick
          )
    );
    if (stage === 0) {
      setMiddleCard(renderNextCard('senior'));
      setRightCard(renderNextCard('tutor'));
    }
    if (stage === 1) {
      setMiddleCard(
        renderCurrentCard('senior', pointsToAssign, techExperience, onIconClick)
      );
      setRightCard(renderNextCard('tutor'));
    } else if (stage === 2) {
      setMiddleCard(renderCompletedCard('senior'));
      setRightCard(
        renderCurrentCard('tutor', pointsToAssign, techExperience, onIconClick)
      );
    }
>>>>>>> ff6c0b9 (feat: logic for navigation button to Schedule container)
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
<<<<<<< HEAD
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
      <NavButtonAssignToSchedule
        moveToSchedule={moveToSchedule}
        pointsToAssign={pointsToAssign}
      />
=======
    <div className={styles.container}>
      {leftCard}
      {middleCard}
      {rightCard}
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
>>>>>>> ff6c0b9 (feat: logic for navigation button to Schedule container)
    </div>
  );
};

export default AssignPoints;
