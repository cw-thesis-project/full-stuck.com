/* eslint-disable camelcase */
export type TechName =
  | 'javascript'
  | 'git'
  | 'react'
  | 'graphql'
  | 'rxjs'
  | 'typescript'
  | 'debugging'
  | 'eloquence'
  | 'espionage';

export type Level = 'junior' | 'senior' | 'tutor' | 'CEO';

export interface Tech {
  name: TechName;
  level: Level;
}

export type LevelMap = Record<Level, number>;

export type Minigame = 'memory' | 'snake' | 'quiz';

export type Activity = Minigame | 'assessment';

export type StarsCount = 0 | 1 | 2 | 3;

export type TechExperience = Record<TechName, number>;

export interface PastActivity {
  name: Activity;
  topic: TechName;
  stars: StarsCount;
}

export interface UserGameData {
  techExperience: TechExperience;
  history: PastActivity[];
  level: Level;
}

export interface User {
  _id: string;
  username: string;
  gameData: UserGameData;
}

export interface Auth0User {
  email: string;
  email_verified: boolean;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
}

export interface ApiResponse {
  data: User;
}
