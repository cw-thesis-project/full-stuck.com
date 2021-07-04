import React from 'react';
import styles from './NavButtonAssignToSchedule.module.scss';

interface Props {
  moveToSchedule: () => void;
  redirectionAllowed: boolean;
}

const NavButtonAssignToSchedule = ({
  moveToSchedule,
  redirectionAllowed,
}: Props): JSX.Element => {
  return (
    <div
      role="button"
      // eslint-disable-next-line no-console
      onKeyDown={() => console.log('hi budda')}
      onClick={() => moveToSchedule()}
      tabIndex={0}
      className={`${styles.scheduleButton} ${
        redirectionAllowed ? styles.activeBtn : styles.inactiveBtn
      }`}
    >
      <h2>Schedule</h2>
    </div>
  );
};

export default NavButtonAssignToSchedule;
