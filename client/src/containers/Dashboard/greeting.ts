import { Level } from '../../shared/types';

const createGreeting = function (level: Level | undefined) {
  let greetingMessage = '';
  switch (level) {
    case 'junior':
      greetingMessage = "Let's GET Coding";
      break;
    case 'senior':
      greetingMessage = 'PUT your back into it';
      break;
    case 'tutor':
      greetingMessage = 'POST us a pun please';
      break;
    case 'CEO':
      greetingMessage = 'DELETE and start again';
      break;
    default:
      greetingMessage = 'good work!';
  }
  return greetingMessage;
};
export default createGreeting;
