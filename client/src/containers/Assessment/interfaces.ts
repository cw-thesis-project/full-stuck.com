import { Level, StarsCount, TechName } from '../../shared/types';

export interface Icon {
  name: TechName;
  isMatched: boolean;
}

export interface AssessmentGameOptions {
  level: Level;
  onGameEnd(starsCount: StarsCount): void;
  gameStartTime: number;
}

export interface IAssessmentGame {
  onIconMatch: (index: number, draggedName: TechName) => void;
  centerIcons: Icon[];
  sideIcons: Icon[];
  totalMatchesCount: number;
  timeLeft: number;
  starsCount: StarsCount;
}
