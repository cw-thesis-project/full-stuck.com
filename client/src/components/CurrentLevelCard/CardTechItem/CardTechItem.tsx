import React from 'react';
import { TechName } from '../../../shared/types';
import styles from './CardTechItem.module.scss';
import TechIcon from '../../TechIcon';

interface Props {
  experience: number;
  techName: TechName;
  onIconClick(techName: TechName): void;
  maxBubbles: number;
}

const CardTechItem = ({
  experience,
  techName,
  onIconClick,
  maxBubbles,
}: Props): JSX.Element => {
  const grayBubbleCount = maxBubbles - experience;
  const grayBubbles =
    grayBubbleCount > 0
      ? Array(grayBubbleCount)
          .fill(null)
          .map(() => (
            <div className={`${styles.bubble} ${styles.greyBubble}`} />
          ))
      : [];
  const coloredBubbles = Array(
    experience < maxBubbles ? experience : maxBubbles
  )
    .fill(null)
    .map(() => (
      <div
        className={`${styles.bubble} ${styles[techName]} ${
          grayBubbleCount ? '' : styles.glow
        }`}
      />
    ));

  function checkIconClick(tech: TechName): void {
    if (experience <= maxBubbles) onIconClick(tech);
  }

  return (
    <div className={styles.techColumn}>
      {grayBubbles}
      {coloredBubbles}
      <div
        role="button"
        // eslint-disable-next-line no-console
        onKeyDown={() => console.log('hi buddy')}
        onClick={() => checkIconClick(techName)}
        className={styles.clickable}
        tabIndex={0}
      >
        <TechIcon techName={techName} iconSize="medium" isGray={false} />
      </div>
      <h4>{techName}</h4>
    </div>
  );
};

export default CardTechItem;
