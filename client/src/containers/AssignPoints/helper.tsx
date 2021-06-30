import React from 'react';
import { technologies, initialTechExperience } from './localUtils';
import { Level, Tech, TechExperience, TechName } from '../../shared/types';
import { levelToNumber } from '../../utils/utils';
import CurrentLevelCard from '../../components/CurrentLevelCard';

interface TechExperienceSubset {
  name: TechName;
  experience: number;
}

export function filterTechs(
  lvl: Level,
  techExperience: TechExperience
): TechExperienceSubset[] {
  const techExperienceSubset: TechExperienceSubset[] = [];
  technologies.forEach((tech) => {
    if (tech.level === lvl)
      techExperienceSubset.push({
        name: tech.name,
        experience: techExperience[tech.name],
      });
  });
  return techExperienceSubset;
}

export function onIconClick(techName: TechName) {
  console.log('hella');
}

export function assignCards(
  level: Level,
  pointsToAssign: number,
  techExperience: TechExperience
): JSX.Element {
  if (level === 'junior') {
    leftCard = (
      <CurrentLevelCard
        pointsToAssign={pointsToAssign}
        techExperienceSubset={filterTechs(level, techExperience)}
        level={level}
        onIconClick={onIconClick}
      />
    );
  }
}
