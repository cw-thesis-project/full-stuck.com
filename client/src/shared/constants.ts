import { Tech } from './types';

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
