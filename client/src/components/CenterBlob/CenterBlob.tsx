import React from 'react';
import classnames from 'classnames';
import { TechName } from '../../shared/types';
import styles from './CenterBlob.module.scss';
import TechIcon from '../TechIcon';

interface Props {
  techNames: TechName[];
  onDragStart(techName: TechName): void;
}

const CenterBlob = ({ techNames, onDragStart }: Props): JSX.Element => {
  const container = classnames({
    [styles.iconsContainer]: true,
    [styles.oneIcon]: techNames.length === 1,
    [styles.twoIcons]: techNames.length === 2,
    [styles.threeIcons]: techNames.length === 3,
  });

  return (
    <div className={styles.container}>
      <div className={container}>
        {techNames.map((techName) => (
          <div
            draggable
            onDragStart={() => onDragStart(techName)}
            className={styles.draggable}
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

export default CenterBlob;
