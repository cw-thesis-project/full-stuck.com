import React from 'react';
import { technologies } from './localUtils';
import { Level, TechExperience, TechName } from '../../shared/types';
import CurrentLevelCard from '../../components/CurrentLevelCard';
import CompletedLevelCard from '../../components/CompletedLevelCard';
import NextLevelCard from '../../components/NextLevelCard';
import { maxBubbles, levelToNumber } from '../../shared/utils';

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
  // for dev purposes
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

export function buttonAllowed(
  lvl: Level,
  techExperience: TechExperience,
  pointsToAssign: number
): boolean {
  if (pointsToAssign === 0) return true;
  const techExperienceSum: number =
    Object.values<number>(techExperience).reduce(
      (acc: number, el: number): number => {
        return acc + el;
      },
      0
    ) + 1;
  const techPerLevel = 3;
  const levelThreshold = techPerLevel * (maxBubbles + 1) - 1;
  const juniorThreshold = levelThreshold;
  const seniorThreshold = juniorThreshold + 1 + levelThreshold;
  const tutorThreshold = seniorThreshold + 1 + levelThreshold;
  if (lvl === 'junior') return techExperienceSum === juniorThreshold;
  if (lvl === 'senior') return techExperienceSum === seniorThreshold;
  if (lvl === 'tutor') return techExperienceSum === tutorThreshold;
  return false;
}
