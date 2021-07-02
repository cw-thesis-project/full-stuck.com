import { ThunkAction } from 'redux-thunk';
import { Level, PastActivity, TechName, User } from '../shared/types';

export interface AppState {
  pointsToAssign: number;
  user: User | null;
  loading: boolean;
  error: Error | string;
}

export type AppAction =
  | UpdateUserSuccessAction
  | UpdateUserRequestAction
  | SaveActivityRequestAction
  | SaveActivitySuccessAction
  | LevelUserUpRequestAction
  | LevelUserUpSuccessAction
  | LearnTechRequestAction
  | LearnTechSuccessAction
  | SetPointsToAssignAction
  | DecreasePointsToAssignAction
  | NewGameRequestAction
  | NewGameSuccessAction
  | GetUserDataRequestAction
  | GetUserDataSuccessAction
  | ResetErrorAction
  | FailureAction;

export interface ApiService {
  learnTech(techName: TechName, user: User): Promise<User | null>;
  saveActivity(activity: PastActivity, user: User): Promise<User | null>;
  newGame(username: string): Promise<User | null>;
  getUserData(username: string): Promise<User | null>;
  updateUser(user: User): Promise<User | null>;
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
  user: User;
}

interface LearnTechRequestAction {
  type: typeof LEARN_TECH_REQUEST;
  techName: TechName;
}

interface LearnTechSuccessAction {
  type: typeof LEARN_TECH_SUCCESS;
  user: User;
}

interface SetPointsToAssignAction {
  type: typeof SET_POINTS_TO_ASSIGN;
  amount: number;
}

interface DecreasePointsToAssignAction {
  type: typeof DECREASE_POINTS_TO_ASSIGN;
}

interface GetUserDataSuccessAction {
  type: typeof GET_USER_DATA_SUCCESS;
  user: User;
}

interface GetUserDataRequestAction {
  type: typeof GET_USER_DATA_REQUEST;
  username: string;
}

interface UpdateUserSuccessAction {
  type: typeof UPDATE_USER_SUCCESS;
  user: User;
}

interface UpdateUserRequestAction {
  type: typeof UPDATE_USER_REQUEST;
  user: User;
}

// new game

interface NewGameRequestAction {
  type: typeof NEW_GAME_REQUEST;
  username: string;
}

interface NewGameSuccessAction {
  type: typeof NEW_GAME_SUCCESS;
  user: User;
}

// level user up

interface LevelUserUpRequestAction {
  type: typeof LEVEL_USER_UP_REQUEST;
  nextLevel: Level;
}

interface LevelUserUpSuccessAction {
  type: typeof LEVEL_USER_UP_SUCCESS;
  user: User;
}

interface ResetErrorAction {
  type: typeof RESET_ERROR;
}

export interface FailureAction {
  type:
    | typeof UPDATE_USER_FAILURE
    | typeof SAVE_ACTIVITY_FAILURE
    | typeof LEARN_TECH_FAILURE
    | typeof GET_USER_DATA_FAILURE
    | typeof LEVEL_USER_UP_FAILURE
    | typeof NEW_GAME_FAILURE;
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

const GET_USER_DATA_REQUEST = 'GET_USER_DATA_REQUEST';
const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';
const GET_USER_DATA_FAILURE = 'GET_USER_DATA_FAILURE';

const NEW_GAME_FAILURE = 'NEW_GAME_FAILURE';
const NEW_GAME_REQUEST = 'NEW_GAME_REQUEST';
const NEW_GAME_SUCCESS = 'NEW_GAME_SUCCESS';

const LEVEL_USER_UP_FAILURE = 'LEVEL_USER_UP_FAILURE';
const LEVEL_USER_UP_REQUEST = 'LEVEL_USER_UP_REQUEST';
const LEVEL_USER_UP_SUCCESS = 'LEVEL_USER_UP_SUCCESS';

const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';

const RESET_ERROR = 'RESET_ERROR';
