import React from 'react';
import styles from './ScreenBackground.module.scss';
import * as shapes from './waves';

interface Props {
  variant: 'full' | 'diagonal' | 'columns' | 'corners' | 'bottom';
}

const ScreenBackground = ({ variant }: Props): JSX.Element => {
  return (
    <div className={styles.container}>
      {variant === 'bottom' && (
        <img
          alt="wave-bottom"
          src={shapes.waveBottom}
          className={styles.bottom}
        />
      )}
      {variant === 'columns' && (
        <>
          <img
            alt="wave-right"
            src={shapes.waveRight}
            className={styles.right}
            draggable={false}
          />
          <img
            alt="wave-left"
            src={shapes.waveLeft}
            className={styles.left}
            draggable={false}
          />
        </>
      )}
      {variant === 'corners' && (
        <>
          <img
            alt="wave-top-left"
            src={shapes.waveTopLeft}
            className={styles.topLeft}
            draggable={false}
          />
          <img
            alt="wave-bottom-right"
            src={shapes.waveBottomRight}
            className={styles.bottomRight}
            draggable={false}
          />
        </>
      )}
      {variant === 'diagonal' && (
        <img
          alt="wave-diagonal"
          src={shapes.waveDiagonal}
          className={styles.fullWidth}
          draggable={false}
        />
      )}
      {variant === 'full' && <div className={styles.fullScreen} />}
    </div>
  );
};

export default ScreenBackground;
