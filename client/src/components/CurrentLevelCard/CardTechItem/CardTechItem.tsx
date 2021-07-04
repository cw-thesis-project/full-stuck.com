/* eslint-disable react/no-array-index-key */
import React from 'react';
import classNames from 'classnames';
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
  const grayBubbles = Array(grayBubbleCount)
    .fill(null)
    .map((_, index) => (
      <div className={`${styles.bubble} ${styles.greyBubble}`} key={index} />
    ));

  const coloredBubbles = Array(
    experience < maxBubbles ? experience : maxBubbles
  )
    .fill(null)
    .map((_, index) => {
      const className = classNames({
        [styles.bubble]: true,
        [styles[techName]]: true,
        [styles.glow]: grayBubbleCount > 0,
      });

      return <div className={className} key={index} />;
    });

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
      </button>
      <h4 className={styles.techName}>{techName}</h4>
    </div>
  );
};

export default CardTechItem;
