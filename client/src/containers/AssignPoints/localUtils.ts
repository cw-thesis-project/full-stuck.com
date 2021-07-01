import { Tech, User } from '../../shared/types';

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

export const initialTechExperience = {
  javascript: 0,
  git: 0,
  react: 0,
  graphql: 0,
  rxjs: 0,
  typescript: 0,
  debugging: 0,
  eloquence: 0,
  espionage: 0,
};

export interface FakeState {
  pointsToAssign: number;
  token: string;
  user: User;
  loading: boolean;
  error: string;
}

const mockUser: User = {
  username: 'Pablo',
  gameData: {
    techExperience: {
      javascript: 3,
      git: 2,
      react: 0,
      graphql: 0,
      rxjs: 0,
      typescript: 0,
      debugging: 0,
      eloquence: 0,
      espionage: 0,
    },
    history: [
      {
        name: 'memory',
        topic: 'javascript',
        stars: 2,
      },
      {
        name: 'assessment',
        topic: 'javascript',
        stars: 0,
      },
    ],
    level: 'junior',
  },
};

export const fakeState: FakeState = {
  pointsToAssign: 2,
  token: '',
  user: mockUser,
  loading: false,
  error: '',
};
