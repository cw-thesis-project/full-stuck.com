import React from 'react';
import { TechName } from '../../shared/types';
import logos from '../../assets/icons';
import styles from './TechLogo.module.scss';
import TechIcon from '../TechIcon';

interface Props {
  status: 'upcoming' | 'current' | 'completed' | 'failed' | 'ongoing';
  techName: TechName | 'empty';
}

const TechLogo = ({ status, techName }: Props): JSX.Element => {
  return techName !== 'empty' ? (
    <TechIcon techName={techName} iconSize="medium" isGray={false} />
  ) : (
    <></>
  );
};
export default TechLogo;
