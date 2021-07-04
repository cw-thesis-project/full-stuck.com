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
        onClick={() => checkIconClick(techName)}
        className={styles.clickable}
        tabIndex={0}
      >
        <TechIcon techName={techName} iconSize="small" isGray={false} />
      </button>
      <h4 className={styles.techName}>{techName}</h4>
    </button>
  );
};

export default CardTechItem;
