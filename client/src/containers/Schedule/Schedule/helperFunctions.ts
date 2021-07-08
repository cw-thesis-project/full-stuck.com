import { DateVariant } from '../CalendarDate';

export default function getDateVariant(
  index: number,
  length: number
): DateVariant {
  if (index === length) {
    return 'current';
  }
  if (index > length) {
    return 'future';
  }

  return 'past';
}

export {};
