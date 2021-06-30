/* eslint-disable no-console */
import React from 'react';
import SideColumn, { mockIcons } from '../../components/SideColumn';
import CenterBlob, { threeTechNames } from '../../components/CenterBlob';
import CountDownBar from '../../components/CountDownBar';
import styles from './Assessment.module.scss';

const Assessment = (): JSX.Element => {
  return (
    <div className={styles.page}>
      <SideColumn
        icons={mockIcons}
        onIconMatch={(index) => console.log('matched index', index)}
      />
      <div className={styles.centerSection}>
        <h1>7.85s</h1>
        <CenterBlob techNames={threeTechNames} />
        <h2>0/15</h2>
        <CountDownBar currentPercentage={0.7} />
      </div>
      <SideColumn
        icons={mockIcons}
        onIconMatch={(index) => console.log('matched index', index)}
      />
    </div>
  );
};

export default Assessment;
