import { TechName } from '../../shared/types';

export const quizTechs: TechName[] = [
  'javascript',
  'git',
  'graphql',
  'react',
  'rxjs',
  'typescript',
];

interface QuizRules {
  rounds: number;
  maxSuggestions: number;
  maxTime: number;
}

export const quizRules: QuizRules = {
  rounds: 3,
  maxSuggestions: 4,
  maxTime: 5,
};
