import React from 'react';
import styles from './CountDownBar.module.scss';

interface Props {
  currentPercentage: number;
}

const CountDownBar = ({ currentPercentage }: Props) => {
  const innerStyle: React.CSSProperties = {
    width: `${currentPercentage * 100}%`,
  };

  return (
    <div className={styles.container}>
      <div className={styles.timeLeft} style={innerStyle}>
        {' '}
      </div>
    </div>
  );
};

export default CountDownBar;
