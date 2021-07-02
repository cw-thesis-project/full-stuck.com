import React, { Dispatch, SetStateAction } from 'react';
import { FakeState } from '../localUtils';

interface Props {
  fakeAppState: FakeState;
  setFakeAppState: Dispatch<SetStateAction<FakeState>>;
}

const TempTestZone = ({
  fakeAppState,
  setFakeAppState,
}: Props): JSX.Element => {
  const { techExperience } = fakeAppState.user.gameData;
  const state: any = fakeAppState;

  const techXPs = Object.entries(techExperience).map((singleTech) => {
    return (
      <div>
        <button
          onClick={() => {
            console.log(
              'clicked',
              state.user.gameData.techExperience[singleTech[0]]
            );
            state.user.gameData.techExperience[singleTech[0]] -= 1;
            setFakeAppState(state);
          }}
          type="button"
        >
          -
        </button>{' '}
        {singleTech[0]} {singleTech[1]}
        <button
          type="button"
          onClick={() => {
            state.user.gameData.techExperience[singleTech[0]] += 1;
            setFakeAppState(state);
          }}
        >
          {' '}
          +{' '}
        </button>
      </div>
    );
  });

  return (
    <div>
      <div>
        <button type="button"> - </button> Level:{' '}
        {fakeAppState.user.gameData.level} <button type="button"> + </button>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            state.pointsToAssign -= 1;
            setFakeAppState(state);
          }}
        >
          {' '}
          -{' '}
        </button>{' '}
        points to Assign {fakeAppState.pointsToAssign}{' '}
        <button
          type="button"
          onClick={() => {
            state.pointsToAssign += 1;
            setFakeAppState(state);
          }}
        >
          {' '}
          +{' '}
        </button>
      </div>
      {techXPs}
    </div>
  );
};

export default TempTestZone;
