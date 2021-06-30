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
  centerGroup: Icon[]; // length based on level
  sideChoices: Icon[]; // always 10 items
  round: Round;
  remainingGroupTimePercent: number;
  startTime: number;
  panaltyTime: number;
  onIconMatch(techName: TechName): void;
}

export interface AssessmentGameOptions {
  level: Level;
  techExperience: TechExperience;
  onGameEnd(starsCount: StarsCount): void;
}
