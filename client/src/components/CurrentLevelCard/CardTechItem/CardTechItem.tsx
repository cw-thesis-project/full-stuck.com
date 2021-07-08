import React from 'react';
import { TechName } from '../../../shared/types';
import styles from './CardTechItem.module.scss';
import TechIcon from '../../TechIcon';
import { useAppSelector } from '../../../store';

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
  const loading = useAppSelector((state) => state.loading);
  const grayBubbleCount = maxBubbles - experience;
  const grayBubbles =
    grayBubbleCount > 0
      ? Array(grayBubbleCount)
          .fill(null)
          .map((index) => (
            <div
              key={index}
              className={`${styles.bubble} ${styles.greyBubble}`}
            />
          ))
      : [];

  const coloredBubblesNumber =
    experience < maxBubbles ? experience : maxBubbles;

  const coloredBubbles = Array(coloredBubblesNumber)
    .fill(null)
    .map((index) => (
      <div
        key={index}
        className={`${styles.bubble} ${styles[techName]} ${
          grayBubbleCount > 0 ? '' : styles.glow
        }`}
      />
    ));

  function preventFrivolousSpending(tech: TechName): void {
    if (experience < maxBubbles && !loading) onIconClick(tech);
  }

  return (
    <div className={styles.techColumn}>
      {grayBubbles}
      {coloredBubbles}
      <button
        type="button"
        onClick={() => preventFrivolousSpending(techName)}
        className={styles.clickable}
      >
        <TechIcon techName={techName} iconSize="small" isGray={false} />
        <h4 className={styles.techName}>{techName}</h4>
      </button>
    </div>
  );
};

export default CardTechItem;
