import React from 'react';
import { TechName } from '../../shared/types';
import logos from '../../assets/icons';
import styles from './TechIcon.module.scss';

interface Props {
  techName: TechName;
  iconSize: 'small' | 'medium' | 'large';
  isGray: boolean;
  // eslint-disable-next-line react/require-default-props
  isLocked?: boolean;
}

// TODO: add all the icons
const iconsMap: Record<TechName, string> = {
  javascript: logos.javascriptLogo,
  git: logos.gitLogo,
  react: logos.reactLogo,
  graphql: logos.graphqlLogo,
  rxjs: logos.javascriptLogo,
  typescript: logos.typescriptLogo,
  debugging: logos.javascriptLogo,
  eloquence: logos.javascriptLogo,
  espionage: logos.javascriptLogo,
};

const TechIcon = ({
  techName,
  iconSize,
  isGray,
  isLocked,
}: Props): JSX.Element => {
  const className = `${styles[iconSize]} ${isGray ? styles.gray : ''}`;

  const src = isLocked ? logos.questionLogo : iconsMap[techName];

  return <img src={src} alt={techName} className={className} />;
};

export default TechIcon;
