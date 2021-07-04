import { technologies } from '../../shared/constants';
import { StarsCount, Tech } from '../../shared/types';
import { shuffle } from '../../shared/utils';
import { Card } from './useMemoryGame';

const matchesThresholds = [3, 6, 9];

export function getStarsCount(matchesDone: number): StarsCount {
  for (let i = 0; i < 3; i += 1) {
    if (matchesDone < matchesThresholds[i]) {
      return i as StarsCount;
    }
  }

  return 3;
}

export function makeCard(tech: Tech): Card {
  return {
    name: tech.name,
    state: 'down',
  };
}

export function createCards(): Card[] {
  const halfCards = technologies.map(makeCard);
  const allCards = [...halfCards, ...halfCards];

  return shuffle(allCards);
}
