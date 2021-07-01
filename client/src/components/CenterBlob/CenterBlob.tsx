/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { TechName } from '../../shared/types';
import styles from './CenterBlob.module.scss';
import icons from '../../assets/icons';
import TechIcon from '../TechIcon';

interface Props {
  techNames: TechName[];
  onDragStart(techName: TechName): void;
}

const CenterBlob = ({ techNames, onDragStart }: Props): JSX.Element => {
  const iconsContainerClass = assignIconsContainerClass(techNames.length);

  return (
    <div className={styles.container}>
      <img className={styles.blob} src={icons.blob} alt="blob" />
      <div className={iconsContainerClass}>
        {techNames.map((techName) => (
          <div draggable onDragStart={() => onDragStart(techName)}>
            <TechIcon
              iconSize="medium"
              isGray={false}
              techName={techName}
              key={techName}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

function assignIconsContainerClass(iconsCount: number): string {
  let className = styles.iconsContainer;

  if (iconsCount === 1) {
    className += ` ${styles.oneIcon}`;
  } else if (iconsCount === 2) {
    className += ` ${styles.twoIcons}`;
  } else {
    className += ` ${styles.threeIcons}`;
  }

  return className;
}

export default CenterBlob;
