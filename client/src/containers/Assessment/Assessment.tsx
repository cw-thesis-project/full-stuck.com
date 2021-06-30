/* eslint-disable no-console */
import React, { useEffect } from 'react';
import SideColumn, { mockIcons } from '../../components/SideColumn';
import CenterBlob, { threeTechNames } from '../../components/CenterBlob';
import CountDownBar from '../../components/CountDownBar';
import { useAssessmentGame } from './assessmentGame';
import styles from './Assessment.module.scss';
import { TechExperience } from '../../shared/types';
import { Icon, IconsGroup } from './interfaces';

const experience: TechExperience = {
  javascript: 0,
  debugging: 0,
  eloquence: 0,
  espionage: 0,
  git: 0,
  graphql: 0,
  react: 0,
  rxjs: 0,
  typescript: 0,
};

const Assessment = (): JSX.Element => {
  useAppSelector();
  const { centerGroup, onIconMatch, round, sidesGroup } = useAssessmentGame({
    level: 'junior',
    onGameEnd: () => console.log('end!'),
    techExperience: experience,
  });

  function handleMatch(index: number) {
    const techName = sidesGroup.icons[index].name;
    const isValid = centerGroup.icons.some((icon) => icon.name === techName);
    if (isValid) {
      console.log('matched', techName);
      onIconMatch(techName);
    } else {
      console.log(techName, 'does not need to be clicked');
    }
  }

  function adaptIcons(icons: Icon[]) {
    return icons.map((icon) => {
      return {
        techName: icon.name,
        isGray: icon.isMatched,
      };
    });
  }

  if (!sidesGroup) {
    return <div>game won!</div>;
  }

  const leftIcons = adaptIcons(sidesGroup.icons.slice(0, 5));
  const rightIcons = adaptIcons(sidesGroup.icons.slice(5));
  const centerIcons = centerGroup.icons
    .filter((icon) => !icon.isMatched)
    .map((icon) => icon.name);

  return (
    <div className={styles.page}>
      <SideColumn
        icons={leftIcons}
        onIconMatch={(index) => handleMatch(index)}
      />
      <div className={styles.centerSection}>
        <h1>7.85s</h1>
        <CenterBlob techNames={centerIcons} />
        <h2>0/15</h2>
        <CountDownBar currentPercentage={0.7} />
      </div>
      <SideColumn
        icons={rightIcons}
        onIconMatch={(index) => handleMatch(index + 5)}
      />
    </div>
  );
};

export default Assessment;
