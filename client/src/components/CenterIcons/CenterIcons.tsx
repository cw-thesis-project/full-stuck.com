import React from 'react';
import classnames from 'classnames';
import { TechName } from '../../shared/types';
import styles from './CenterIcons.module.scss';
import TechIcon from '../TechIcon';

interface Props {
  techNames: TechName[];
  onDragStart(techName: TechName): void;
  onDragEnd(): void;
  isDragging: boolean;
}

const CenterIcons = ({
  techNames,
  onDragStart,
  onDragEnd,
  isDragging,
}: Props): JSX.Element => {
  const container = classnames({
    [styles.container]: true,
    [styles.oneIcon]: techNames.length === 1,
    [styles.twoIcons]: techNames.length === 2,
    [styles.threeIcons]: techNames.length === 3,
  });

  return (
    <div className={container}>
      {techNames.map((techName) => (
        <div
          draggable
          key={techName}
          onDragStart={() => onDragStart(techName)}
          onDragEnd={onDragEnd}
          className={styles.draggable}
          title={isDragging ? '' : 'drag me!'}
        >
          <TechIcon
            iconSize="medium"
            isGray={false}
            techName={techName}
            key={techName}
          />
        </div>
      ))}
    </div>
  );
};

export default CenterIcons;
