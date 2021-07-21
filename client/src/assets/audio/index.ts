/* eslint-disable import/no-unresolved */
import { Howl } from 'howler';
import { SoundName } from 'services/audioService';

function makeHowl(fileName: string, volume: number): Howl {
  return new Howl({
    src: `/audio/${fileName}`,
    volume,
  });
}

// paths actually refer to /public/audio

// [fileName, volume]
const sounds: Record<SoundName, Howl> = {
  buttonClick: makeHowl('correct-3.mp3', 1),
  cardFlip: makeHowl('28886__junggle__btn076.wav', 1),
  dragFailure: makeHowl('521973__kastenfrosch__error.ogg', 1),
  dragStart: makeHowl('28886__junggle__btn076.wav', 1),
  dragSuccess: makeHowl('correct-3.mp3', 1),
  gameOver: makeHowl('521973__kastenfrosch__error.ogg', 1),
  gameWon: makeHowl('162476__kastenfrosch__gotitem.mp3', 1),
  letterTyped: makeHowl('key-stroke-2.wav', 1),
  mistake: makeHowl('521973__kastenfrosch__error.ogg', 1),
  slide: makeHowl('swipe_002.mp3', 1),
  snakeChangeDirection: makeHowl(
    '270343__littlerobotsoundfactory__shoot-01.wav',
    1
  ),
  snakeEat: makeHowl('270337__littlerobotsoundfactory__pickup-00.wav', 1),
  stars: makeHowl('win-2.wav', 1),
  techLearnt: makeHowl('correct-1.mp3', 1),
};

export default sounds;
