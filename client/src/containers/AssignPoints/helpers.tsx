import React from 'react';
import { technologies } from './localUtils';
import { Level, TechExperience, TechName } from '../../shared/types';
import CurrentLevelCard from '../../components/CurrentLevelCard';
import CompletedLevelCard from '../../components/CompletedLevelCard';
import NextLevelCard from '../../components/NextLevelCard';

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

export function renderCurrentCard(
  lvl: Level,
  pointsToAssign: number,
  techExperience: TechExperience,
  onIconClick: (techName: TechName) => void
): JSX.Element {
  return (
    <CurrentLevelCard
      pointsToAssign={pointsToAssign}
      techExperienceSubset={filterTechs(lvl, techExperience)}
      level={lvl}
      onIconClick={onIconClick}
    />
  );
}

export function renderCompletedCard(lvl: Level): JSX.Element {
  return <CompletedLevelCard level={lvl} />;
}
export function renderNextCard(lvl: Level): JSX.Element {
  return <NextLevelCard level={lvl} />;
}
