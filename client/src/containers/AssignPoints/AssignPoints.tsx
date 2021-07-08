import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { TechName } from 'shared/types';
import styles from './AssignPoints.module.scss';
import { useAppDispatch, useAppSelector } from '../../store';
import { setActivityTopic } from '../../store/thunks';
import { assignCards, buttonAllowed } from './helpers';
import useAssignPointsAnimation from './useAssignPointsAnimation';

const AssignPoints = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [leftCard, setLeftCard] = useState<JSX.Element>(<div>Pabeli</div>);
  const [middleCard, setMiddleCard] = useState<JSX.Element>(<div>Pabelow</div>);
  const [rightCard, setRightCard] = useState<JSX.Element>(<div>Pabelu</div>);
  const [redirectionAllowed, setRedirectionAllowed] = useState<boolean>(false);
  const pointsToAssign = useAppSelector((state) => state.pointsToAssign);
  const user = useAppSelector((state) => state.user);
  useAssignPointsAnimation();

  if (!user) {
    return <Redirect to="/" />;
  }

  const { level, techExperience, history: userHistory } = user.gameData;

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

  const footerNoCeo = (
    <>
      <p className={styles.footerText}>Spend the points you have earned...</p>
      <div>
        <button
          type="button"
          onClick={() => moveToSchedule()}
          className={`${styles.button} ${
            redirectionAllowed ? styles.activeBtn : styles.inactiveBtn
          }`}
        >
          Schedule
        </button>
      </div>
      <p className={styles.footerText}>...to improve your knowledge!</p>
    </>
  );

  const footerCeo = (
    <>
      <div className={styles.scheduleButton}>
        <Link className={styles.button} to="/schedule" title="schedule">
          Schedule
        </Link>
      </div>
      <p className={styles.footerText}>You took over the whole thing!</p>
      <Link className={styles.button} to="/ceo" title="ceo">
        Brag
      </Link>
    </>
  );

  return (
    <div className={styles.screen}>
      <h1 className={styles.pageTitle}>Congratulations</h1>
      <div className={styles.card}>{leftCard}</div>
      <div className={styles.card}>{middleCard}</div>
      <div className={styles.card}>{rightCard}</div>
      {level === 'CEO' ? footerCeo : footerNoCeo}
    </div>
  );
};

export default AssignPoints;
