/* eslint-disable no-console */
import React from 'react';
import SideColumn from '../../components/SideColumn';
import CenterBlob from '../../components/CenterBlob';
import CountDownBar from '../../components/CountDownBar';
import useAssessmentGame from './assessmentGame';
import styles from './Assessment.module.scss';
import { TechExperience } from '../../shared/types';
import { getIconDescriptors } from './helpers';

// not even used at the moment - will do in the future
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
  const game = useAssessmentGame({
    level: 'junior',
    onGameEnd: () => console.log('end!'),
    techExperience: experience,
  });

  function handleIconMatch(index: number) {
    const techName = game.sidesGroup.icons[index].name;
    const isValid = game.centerGroup.icons.some(
      (icon) => icon.name === techName
    );
    if (isValid) {
      console.log('matched', techName);
      game.onIconMatch(techName);
    } else {
      console.log(techName, 'does not need to be clicked');
    }
  }

  if (!game.sidesGroup) {
    return <div>game won!</div>;
  }

  // prepare props for children
  const leftIcons = getIconDescriptors(game.sidesGroup.icons.slice(0, 5));
  const rightIcons = getIconDescriptors(game.sidesGroup.icons.slice(5));
  const centerIcons = game.centerGroup.icons
    .filter((icon) => !icon.isMatched)
    .map((icon) => icon.name);

  return (
    <div className={styles.page}>
      <SideColumn
        icons={leftIcons}
        onIconMatch={(index) => handleIconMatch(index)}
      />
      <div className={styles.centerSection}>
        <h1>{game.gameTime.toFixed(1)}s</h1>
        <CenterBlob techNames={centerIcons} />
        <h2>
          {game.round}/{game.rounds}
        </h2>
        <CountDownBar currentPercentage={0.7} />
      </div>
      <SideColumn
        icons={rightIcons}
        onIconMatch={(index) => handleIconMatch(index + 5)}
      />
    </div>
  );
};

export default Assessment;
