import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import styles from './AssignPoints.module.scss';
import { useAppDispatch, useAppSelector } from '../../store';
import CurrentLevelCard from '../../components/CurrentLevelCard';
import { technologies, initialTechExperience } from './localUtils';
import { Level, Tech, TechName } from '../../shared/types';
import { levelToNumber } from '../../utils/utils';
import { filterTechs, assignCards } from './helper';

const AssignPoints = (): JSX.Element => {
  const appState = useAppSelector((state) => state);
  const pointsToAssign = appState.user ? appState.pointsToAssign : 0;
  const level = appState.user ? appState.user.gameData.level : 'junior';
  const techExperience = appState.user
    ? appState.user.gameData.techExperience
    : initialTechExperience;

  let leftCard;
  let middleCard;
  let rightCard;

  useEffect(() => {
    assignCards(level, pointsToAssign, techExperience);
  }, []);

  return (
    <div>
      {leftCard}
      {middleCard}
      {rightCard}
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
