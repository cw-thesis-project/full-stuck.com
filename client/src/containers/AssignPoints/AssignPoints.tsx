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
      <NavButtonAssignToSchedule
        moveToSchedule={moveToSchedule}
        pointsToAssign={pointsToAssign}
      />
    </div>
  );
};

export default AssignPoints;

/*
<CompletedLevelCard level="junior" />

NextLevelCard: Add this on Dashboard component:
<NextLevelCard level="tutor" />

CurrentLevelCard: Add this on Dashboard component:
{
  pointsToAssign: 0,
  token: '',
  user: null,
  loading: false,
  error: '',
}

<CurrentLevelCard
          pointsToAssign={3}
          techExperienceSubset={[
            { name: 'react', experience: 2 },
            { name: 'javascript', experience: 1 },
            { name: 'git', experience: 0 },
          ]}
          level="senior"
          onBubbleClick={() => console.log('hello my lady')}
        />


        export const technologies: Tech[] = [
  { name: 'javascript', level: 'junior' },
  { name: 'git', level: 'junior' },
  { name: 'react', level: 'junior' },
  { name: 'graphql', level: 'senior' },
  { name: 'rxjs', level: 'senior' },
  { name: 'typescript', level: 'senior' },
  { name: 'debugging', level: 'tutor' },
  { name: 'eloquence', level: 'tutor' },
  { name: 'espionage', level: 'tutor' },
];
*/
