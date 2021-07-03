import { LevelMap, Tech, User } from './types';

export const auth0 = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN as string,
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID as string,
  redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URI as string,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE as string,
};

export const apiUrl = process.env.REACT_APP_API_URL as string;

export const technologies: Tech[] = [
  { name: 'javascript', level: 'junior' },
  { name: 'git', level: 'junior' },
  { name: 'react', level: 'junior' },
  { name: 'graphql', level: 'senior' },
  { name: 'rxjs', level: 'senior' },
  { name: 'typescript', level: 'senior' },
  { name: 'debugging', level: 'tutor' },
  { name: 'eloquence', level: 'tutor' },
  { name: 'espionage', level: 'tutor' },
];

export const maxTechnologyExperience = 3;

export const emptyUser: User = {
  username: '',
  gameData: {
    techExperience: {
      javascript: 0,
      git: 0,
      react: 0,
      graphql: 0,
      rxjs: 0,
      typescript: 0,
      debugging: 0,
      eloquence: 0,
      espionage: 0,
    },
    history: [],
    level: 'junior',
  },
};

export const levelToNumber: LevelMap = {
  junior: 0,
  senior: 1,
  tutor: 2,
  CEO: 3,
};
