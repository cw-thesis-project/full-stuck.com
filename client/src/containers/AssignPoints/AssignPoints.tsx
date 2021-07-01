import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './AssignPoints.module.scss';
import { useAppDispatch, useAppSelector } from '../../store';
import { TechName, UserGameData } from '../../shared/types';
import { levelToNumber } from '../../utils/utils';
import { learnTech } from '../../store/thunks';
import {
  renderCurrentCard,
  renderCompletedCard,
  renderNextCard,
} from './helpers';
import { fakeState } from './localUtils';

const AssignPoints = (): JSX.Element => {
  const history = useHistory();
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
  }

  useEffect(() => {
    assignCards();
  }, [pointsToAssign]);

  return (
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
