import React from 'react';
import styles from './NavButtonAssignToSchedule.module.scss';

interface Props {
  moveToSchedule: () => void;
  pointsToAssign: number;
}

const NavButtonAssignToSchedule = ({
  moveToSchedule,
  pointsToAssign,
}: Props): JSX.Element => {
  return (
    <div
      role="button"
      // eslint-disable-next-line no-console
      onKeyDown={() => console.log('hi buddy')}
      onClick={() => moveToSchedule()}
      tabIndex={0}
      className={`${styles.scheduleButton} ${
        pointsToAssign > 0 ? styles.inactiveBtn : styles.activeBtn
      }`}
    >
      <h2>Schedule</h2>
    </div>
  );
};

export default NavButtonAssignToSchedule;