import React, { useEffect, useState } from 'react';
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
  const [leftCard, setLeftCard] = useState<JSX.Element>(<div>hello</div>);
  const [middleCard, setMiddleCard] = useState<JSX.Element>(<div>hello</div>);
  const [rightCard, setRightCard] = useState<JSX.Element>(<div>hello</div>);
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

  function assignCards() {
    const stage = levelToNumber[level];
    setLeftCard(
      stage > 0
        ? renderCompletedCard('junior')
        : renderCurrentCard(
            'junior',
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
    </div>
  );
};

export default AssignPoints;
