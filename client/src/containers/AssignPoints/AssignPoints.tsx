import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import styles from './AssignPoints.module.scss';
import { useAppDispatch, useAppSelector } from '../../store';
import CurrentLevelCard from '../../components/CurrentLevelCard';

import { Level, Tech, TechName } from '../../shared/types';

const technologies: Tech[] = [
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

const initialTechExperience = {
  javascript: 0,
  git: 0,
  react: 0,
  graphql: 0,
  rxjs: 0,
  typescript: 0,
  debugging: 0,
  eloquence: 0,
  espionage: 0,
};

type TechAggregate = Record<string, Level>;

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

  function filterTechs(lvl: Level) {
    // create an object from tech structured as { {techName, level} etc }, to help filtering below
    const techAggregate: TechAggregate = technologies.reduce(
      (acc: TechAggregate, el) => {
        if (!acc) return { [el.name]: el.level };
        return { ...acc, [el.name]: el.level };
      },
      {}
    );
    const techExperienceSubset = Object.entries(techExperience).filter(
      (tech) => {
        return techAggregate[tech[0]] === lvl;
      }
    );
    return techExperienceSubset;
  }

  filterTechs('junior');

  // function assignCards() {
  //   if (level === 'junior') {
  //     leftCard = (
  //       <CurrentLevelCard pointsToAssign={pointsToAssign} level={level} />
  //     );
  //   }
  // }

  function onIconClick(techName: TechName) {
    console.log('hella');
  }

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
