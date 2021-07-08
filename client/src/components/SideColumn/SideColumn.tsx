/* eslint-disable react/no-array-index-key */
import React from 'react';
import classNames from 'classnames';
import styles from './SideColumn.module.scss';
import TechIcon from '../TechIcon';
import { Icon } from '../../containers/Assessment/interfaces';

interface Props {
  icons: Icon[];
  variant: 'left' | 'right';
  onIconMatch(index: number): void;
}

const SideColumn = ({ icons, onIconMatch, variant }: Props): JSX.Element => {
  const container = classNames({
    [styles.sideColumn]: true,
    [styles[variant]]: true,
  });

  const techContainer = classNames({
    [styles.leftIcon]: variant === 'left',
    [styles.rightIcon]: variant === 'right',
  });

  return (
    <div className={container}>
      {icons.map(({ isMatched, name }, index) => (
        <div
          key={index}
          onDrop={() => onIconMatch(index)}
          onDragOver={(e) => e.preventDefault()}
          className={techContainer}
          title={name}
        >
          <TechIcon isGray={isMatched} techName={name} iconSize="medium" />
        </div>
      ))}
    </div>
  );
};

export default SideColumn;
