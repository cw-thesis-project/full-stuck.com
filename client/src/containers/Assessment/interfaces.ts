import { Level, StarsCount, TechName } from 'shared/types';

export interface Icon {
  name: TechName;
  isMatched: boolean;
}

export interface AssessmentGameOptions {
  level: Level;
  onGameEnd(starsCount: StarsCount): void;
}

export interface IAssessmentGame {
  onIconMatch: (index: number, draggedName: TechName) => void;
  gameState: AssesmentGameState;
}

export interface AssesmentGameState {
  centerIcons: Icon[];
  sideIcons: Icon[];
  timeLeft: number;
  groupMatchesCount: number;
  totalMatchesCount: number;
  starsCount: StarsCount;
  isOver: boolean;
}
