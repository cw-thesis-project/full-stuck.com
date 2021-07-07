import { ScalingSquaresSpinner } from 'react-epic-spinners';

import React from 'react';
import styles from './Loading.module.scss';

const Loading = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <ScalingSquaresSpinner
        size={100}
        color="#ff4034"
        className={styles.loader}
      />
    </div>
  );
};

export default Loading;
