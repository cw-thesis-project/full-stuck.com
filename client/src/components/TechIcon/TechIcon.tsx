/* eslint-disable import/no-unresolved */
import React from 'react';
import classnames from 'classnames';
import * as logos from 'assets/icons';
import { TechName } from 'shared/types';
import styles from './TechIcon.module.scss';

interface Props {
  techName: TechName;
  iconSize: 'small' | 'medium' | 'large';
  isGray: boolean;
  isLocked?: boolean;
}

const iconsMap: Record<TechName, string> = {
  javascript: logos.javascriptLogo,
  git: logos.gitLogo,
  react: logos.reactLogo,
  graphql: logos.graphqlLogo,
  rxjs: logos.rxjsLogo,
  typescript: logos.typescriptLogo,
  debugging: logos.debuggingLogo,
  eloquence: logos.eloquenceLogo,
  espionage: logos.espionageLogo,
};

const TechIcon = ({
  techName,
  iconSize,
  isGray,
  isLocked,
}: Props): JSX.Element => {
  const className = classnames({
    [styles[iconSize]]: true,
    [styles.gray]: isGray,
  });

  const src = isLocked ? logos.questionLogo : iconsMap[techName];

  return <img src={src} alt={techName} className={className} />;
};

TechIcon.defaultProps = {
  isLocked: false,
};

export default TechIcon;
