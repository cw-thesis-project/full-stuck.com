import React from 'react';

interface Props {
  isFailed: boolean;
}
const PastScheduleCard = ({ isFailed }: Props): JSX.Element => {
  return <p>{`${isFailed}`}</p>;
};

export default PastScheduleCard;
