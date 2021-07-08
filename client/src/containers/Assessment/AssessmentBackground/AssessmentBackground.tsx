/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import classnames from 'classnames';
import styles from './AssessmentBackground.module.scss';

interface Props {
  isDragging: boolean;
}

const AssessmentBackground = ({ isDragging }: Props): JSX.Element => {
  return (
    <div className={styles.container}>
      <LeftColumn isDark={!isDragging} />
      <RightColumn isDark={!isDragging} />
    </div>
  );
};

interface ColumnProps {
  isDark: boolean;
}

const LeftColumn = ({ isDark }: ColumnProps): JSX.Element => {
  const container = classnames({
    [styles.column]: true,
    [styles.dark]: isDark,
  });

  return (
    <svg
      viewBox="0 0 498 1080"
      fill="none"
      className={container}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d)">
        <path d="M453 0L365.096 1080H0V0H453Z" />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="-45"
          y="-45"
          width="543"
          height="1170"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feMorphology
            radius="15"
            operator="dilate"
            in="SourceAlpha"
            result="effect1_dropShadow"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="15" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

const RightColumn = ({ isDark }: ColumnProps): JSX.Element => {
  const container = classnames({
    [styles.column]: true,
    [styles.dark]: isDark,
  });

  return (
    <svg
      viewBox="0 0 498 1080"
      fill="none"
      className={container}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d)">
        <path d="M45 1080L132.904 0H498V1080H45Z" fill="#3B1C94" />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0"
          y="-45"
          width="543"
          height="1170"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feMorphology
            radius="15"
            operator="dilate"
            in="SourceAlpha"
            result="effect1_dropShadow"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="15" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default AssessmentBackground;
