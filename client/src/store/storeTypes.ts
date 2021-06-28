import { ThunkAction } from 'redux-thunk';
import { PastActivity, TechName, User } from '../shared/types';

export interface AppState {
  pointsToAssign: number;
  user: User | null;
  loading: boolean;
  error: Error | string;
  token: string;
}

export type AppAction =
  | SaveActivityRequestAction
  | SaveActivitySuccessAction
  | LearnTechRequestAction
  | LearnTechSuccessAction
  | SetPointsToAssignAction
  | DecreasePointsToAssignAction
  // | LoginRequestAction
  // | RegisterRequestAction
  | LoginSuccessAction
  | RegisterSuccessAction
  | ResetErrorAction
  | FailureAction;

export interface ApiService {
  learnTech(techName: TechName, user: User, token: string): void;
  saveActivity(activity: PastActivity, user: User, token: string): void;
  // login(): void;
  // register(): void;
}

// see https://redux.js.org/usage/usage-with-typescript#type-checking-redux-thunks
export type Thunk = ThunkAction<
  void | Promise<unknown>,
  AppState,
  ApiService,
  AppAction
>;

// actions interfaces

interface SaveActivityRequestAction {
  type: typeof SAVE_ACTIVITY_REQUEST;
  activity: PastActivity;
}

interface SaveActivitySuccessAction {
  type: typeof SAVE_ACTIVITY_SUCCESS;
  activity: PastActivity;
}

interface LearnTechRequestAction {
  type: typeof LEARN_TECH_REQUEST;
  techName: TechName;
}

interface LearnTechSuccessAction {
  type: typeof LEARN_TECH_SUCCESS;
  techName: TechName;
}

interface SetPointsToAssignAction {
  type: typeof SET_POINTS_TO_ASSIGN;
  amount: number;
}

interface DecreasePointsToAssignAction {
  type: typeof DECREASE_POINTS_TO_ASSIGN;
}

// interface LoginRequestAction {
//   type: typeof LOGIN_REQUEST;
//   credentials: UserCredentials;
// }

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  user: User;
}

// interface RegisterRequestAction {
//   type: typeof REGISTER_REQUEST;
//   credentials: UserCredentials;
// }

interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  user: User;
}

interface ResetErrorAction {
  type: typeof RESET_ERROR;
}

export interface FailureAction {
  type:
    | typeof SAVE_ACTIVITY_FAILURE
    | typeof LEARN_TECH_FAILURE
    | typeof LOGIN_FAILURE
    | typeof REGISTER_FAILURE;
  error: Error | string;
}

// action types

const SAVE_ACTIVITY_REQUEST = 'SAVE_ACTIVITY_REQUEST';
const SAVE_ACTIVITY_SUCCESS = 'SAVE_ACTIVITY_SUCCESS';
const SAVE_ACTIVITY_FAILURE = 'SAVE_ACTIVITY_FAILURE';

const LEARN_TECH_REQUEST = 'LEARN_TECH_REQUEST';
const LEARN_TECH_SUCCESS = 'LEARN_TECH_SUCCESS';
const LEARN_TECH_FAILURE = 'LEARN_TECH_FAILURE';

const SET_POINTS_TO_ASSIGN = 'SET_POINTS_TO_ASSIGN';
const DECREASE_POINTS_TO_ASSIGN = 'DECREASE_POINTS_TO_ASSIGN';

// const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

// const REGISTER_REQUEST = 'REGISTER_REQUEST';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILURE = 'REGISTER_FAILURE';

const RESET_ERROR = 'RESET_ERROR';
