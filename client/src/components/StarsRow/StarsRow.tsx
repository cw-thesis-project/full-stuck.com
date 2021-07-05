import React from 'react';
import classnames from 'classnames';
import styles from './StarsRow.module.scss';
import icons from '../../assets/icons';
import { StarsCount } from '../../shared/types';

const starsArray = [0, 1, 2];

interface Props {
  starsCount: StarsCount;
}

const StarsRow = ({ starsCount }: Props): JSX.Element => {
  return (
    <div className={styles.container}>
      {starsArray.map((number) => {
        const className = classnames({
          [styles.star]: true,
          [styles.gray]: starsCount <= number,
        });
        return (
          <img
            alt="star icon"
            className={className}
            src={icons.star}
            key={number}
          />
        );
      })}
    </div>
  );
};

export default StarsRow;
