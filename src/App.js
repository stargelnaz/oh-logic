// App.js
import React, { useState } from 'react';
import TeamDetails from './GatherDetails';
import SlotReward from './SlotReward';

function App() {
  const [rollResult, setRollResult] = useState(null);

  const rollDice = () => {
    const result = Math.floor(Math.random() * 100) + 1;
    setRollResult(result);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <TeamDetails />

      <h1 className='text-4xl mb-4 p-4 '>PAYOUT</h1>
      <button
        className='px-4 py-2 bg-blue-500 text-white rounded-md mb-4'
        onClick={rollDice}
      >
        Roll the Dice
      </button>
      {rollResult && <p className='text-2xl'>Result: {rollResult}</p>}

      {/* Boxes */}
      <div>
        <div className='grid grid-cols-2 gap-4 p-4'>
          <SlotReward rollResult={rollResult} />
          <SlotReward rollResult={rollResult} />
          <SlotReward rollResult={rollResult} />
          <SlotReward rollResult={rollResult} />

          {/* Rest of the components */}
        </div>
      </div>
    </div>
  );
}

export default App;
