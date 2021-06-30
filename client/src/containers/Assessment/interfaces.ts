import {
  Level,
  StarsCount,
  TechExperience,
  TechName,
} from '../../shared/types';

export interface Icon {
  name: TechName;
  isMatched: boolean;
}

export interface Round {
  current: number;
  total: number;
}

export interface IconsGroup {
  groupIndex: number;
  icons: Icon[];
}

export interface IAssessmentGame {
  onIconMatch: (techName: TechName) => void;
  centerGroup: IconsGroup;
  sidesGroup: IconsGroup;
  round: number;
  groupTimeLeftPercent: number;
  rounds: number;
  gameTime: number;
}

export interface AssessmentGameOptions {
  level: Level;
  techExperience: TechExperience;
  onGameEnd(starsCount: StarsCount): void;
}
