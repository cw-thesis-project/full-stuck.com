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

  const grayBubbles = Array.from({ length: grayBubbleCount }, (_, k) => (
    <div key={k} className={`${styles.bubble} ${styles.greyBubble}`} />
  ));

  const coloredBubbles = Array.from({ length: experience }, (_, k) => (
    <div key={k} className={`${styles.bubble} ${styles[techName]}`} />
  ));

  return (
    <div className={styles.techColumn}>
      {grayBubbles}
      {coloredBubbles}
      <div
        role="button"
        // eslint-disable-next-line no-console
        onKeyDown={() => console.log('hi buddy')}
        onClick={() => onIconClick(techName)}
        className={styles.clickable}
        tabIndex={0}
      >
        <TechIcon techName={techName} iconSize="small" isGray={false} />
      </div>
      <h4>{techName}</h4>
    </div>
  );
};

export default CardTechItem;
