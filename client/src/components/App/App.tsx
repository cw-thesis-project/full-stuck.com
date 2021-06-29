import React from 'react';
import './App.css';

import Schedule from '../Schedule';
import { completedWeek } from '../Schedule/mock';

function App() {
  return (
    <div className="App">
      <Schedule history={completedWeek} />
    </div>
  );
}

export default App;
