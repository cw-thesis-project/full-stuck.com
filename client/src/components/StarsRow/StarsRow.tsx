import React from 'react';
import classnames from 'classnames';
import { star } from 'assets/icons';
import styles from './StarsRow.module.scss';
import { StarsCount } from '../../shared/types';

const starsArray = [0, 1, 2];

interface Props {
  starsCount: StarsCount;
  isBig?: boolean;
}

const StarsRow = ({ starsCount, isBig }: Props): JSX.Element => {
  const container = classnames({
    [styles.container]: true,
    [styles.big]: isBig,
  });

  return (
    <div className={container}>
      {starsArray.map((number) => {
        const className = classnames({
          [styles.star]: true,
          [styles.gray]: starsCount <= number,
          [styles.big]: isBig,
        });

        return (
          <img alt="star icon" className={className} src={star} key={number} />
        );
      })}
    </div>
  );
};

StarsRow.defaultProps = {
  isBig: false,
};

export default StarsRow;
