/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useRef } from 'react';
import { TechName } from '../../shared/types';
import styles from './CenterBlob.module.scss';
import icons from '../../assets/icons';
import TechIcon from '../TechIcon';

interface Props {
  techNames: TechName[];
}

const CenterBlob = ({ techNames }: Props): JSX.Element => {
  const [dragging, setDragging] = useState(false);

  const handletDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    techName: TechName
  ) => {
    console.log('Starting to drag', techName);

    setTimeout(() => {
      setDragging(true);
    }, 0);
  };
  const handleDragEnd = (
    e: React.DragEvent<HTMLDivElement> | null,
    techName: TechName
  ) => {
    console.log('Ending drag', e && e.clientY, e && e.clientX);
    setDragging(false);
  };

  const iconsContainerClass = assignIconsContainerClass(techNames.length);

  return (
    <div className={styles.container}>
      <img className={styles.blob} src={icons.blob} alt="blob" />
      <div className={iconsContainerClass}>
        {techNames.map((techName) => (
          <div
            draggable
            onDragStart={(e) => handletDragStart(e, techName)}
            onDragEnd={(e) => dragging && handleDragEnd(e, techName)}
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
