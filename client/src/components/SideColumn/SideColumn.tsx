/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { TechName } from '../../shared/types';
import styles from './SideColumn.module.scss';
import TechIcon from '../TechIcon';

export interface IconDescriptor {
  techName: TechName;
  isGray: boolean;
}

interface Props {
  icons: IconDescriptor[];
  onIconMatch(index: number): void;
}

const SideColumn = ({ icons, onIconMatch }: Props): JSX.Element => {
  return (
    <div className={styles.sideColumn}>
      {icons.map(({ isGray, techName }, index) => (
        <div onClick={() => onIconMatch(index)} key={index}>
          <TechIcon isGray={isGray} techName={techName} iconSize="large" />
        </div>
      ))}
    </div>
  );
};

export default SideColumn;
