/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import styles from './SideColumn.module.scss';
import TechIcon from '../TechIcon';
import { Icon } from '../../containers/Assessment/interfaces';

interface Props {
  icons: Icon[];
  onIconMatch(index: number): void;
}

const SideColumn = ({ icons, onIconMatch }: Props): JSX.Element => {
  return (
    <div className={styles.sideColumn}>
      {icons.map(({ isMatched, name }, index) => (
        <div
          key={index}
          onDrop={() => onIconMatch(index)}
          onDragOver={(e) => e.preventDefault()}
        >
          <TechIcon isGray={isMatched} techName={name} iconSize="medium" />
        </div>
      ))}
    </div>
  );
};

export default SideColumn;
