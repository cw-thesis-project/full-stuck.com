import React from 'react';
import { technologies } from './localUtils';
import { Level, TechExperience, TechName } from '../../shared/types';
import CurrentLevelCard from '../../components/CurrentLevelCard';
import CompletedLevelCard from '../../components/CompletedLevelCard';
import NextLevelCard from '../../components/NextLevelCard';
import { levelToNumber } from '../../shared/constants';

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

export function assignCards(
  level: Level,
  showAll: boolean,
  setLeftCard: React.Dispatch<React.SetStateAction<JSX.Element>>,
  setMiddleCard: React.Dispatch<React.SetStateAction<JSX.Element>>,
  setRightCard: React.Dispatch<React.SetStateAction<JSX.Element>>,
  pointsToAssign: number,
  techExperience: TechExperience,
  onIconClick: (techName: TechName) => void
): void {
  const stage = levelToNumber[level];
  if (showAll) {
    setLeftCard(
      renderCurrentCard('junior', pointsToAssign, techExperience, onIconClick)
    );
    setMiddleCard(
      renderCurrentCard('senior', pointsToAssign, techExperience, onIconClick)
    );
    setRightCard(
      renderCurrentCard('tutor', pointsToAssign, techExperience, onIconClick)
    );
    return;
  }
  setLeftCard(
    stage > 0
      ? renderCompletedCard('junior')
      : renderCurrentCard('junior', pointsToAssign, techExperience, onIconClick)
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
