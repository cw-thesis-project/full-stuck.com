type TechName = 'javascript' | '...';

type Level = 'junior' | 'senior' | 'tutor';

interface Tech {
  name: TechName;
  level: Level;
}

type Outcome = 'win' | 'lose';

// ERROR
// const something: Outcome = 'stuck';

// PRETTIER AUTOFORMATS
//    const something: Outcome = "win"

// typescript error
// const javascript: Tech = {
//   name: 'javascript',
// };
