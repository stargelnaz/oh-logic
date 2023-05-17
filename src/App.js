// App.js
import React, { useState } from 'react';
import WhatAction from './WhatAction';
import WhatRarity from './WhatRarity';
import CalculateTeamBonus from './CalculateTeamBonus';
import rarityData from './rarity.json';

function App() {
  const [rollResult, setRollResult] = useState(null);
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('');

  const rollDice = () => {
    const result = Math.floor(Math.random() * 100) + 1;
    setRollResult(result);
  };

  const calculateReward = () => {
    if (rollResult) {
      const guaranteedValue = (rollResult / 50 - 1) * 0.75 + 1.25;
      return guaranteedValue.toFixed(1);
    }
    return '';
  };

  const handleActionClick = (action) => {
    setSelectedAction(action);
  };

  const handleRarityClick = (rarity) => {
    setSelectedRarity(rarity);
  };

  return (
    <div
      className='flex flex-col items-center justify-center min-h-screen bg-black 
    border border-black'
    >
      <div>
        <WhatAction
          selectedAction={selectedAction}
          handleActionClick={handleActionClick}
        />
        <div>
          <br />
        </div>
        <WhatRarity
          selectedRarity={selectedRarity}
          handleRarityClick={handleRarityClick}
        />
      </div>
      <div>
        <CalculateTeamBonus />
      </div>

      <div className='flex flex-col items-center justify-center p-b m-4 bg-white border border-black p-4'>
        <h1 className='text-4xl bg-white'>PAYOUT</h1>
        <button
          className='px-4 py-2 bg-blue-500 text-white rounded-md mb-4'
          onClick={rollDice}
        >
          Roll the Dice
        </button>
        {rollResult && <p className='text-2xl'>Result: {rollResult}</p>}
      </div>
      {/* Boxes */}
      <div>
        <div className='grid grid-cols-2 gap-4 p-4'>
          <div className='bg-gray-200 p-4 w-300 h-500'>
            <h2 className='text-lg font-bold mb-2'>SLOT REWARD</h2>
            {calculateReward() ? (
              <>
                Base Reward: {calculateReward()} UNITS
                <br />
              </>
            ) : (
              <p>Waiting on Roll</p>
            )}
            {selectedRarity ? (
              <>
                Extra Reward for {selectedRarity}
                <br />
                <p>
                  Die: {rarityData[selectedRarity]?.Die} (divided by 2:{' '}
                  {Math.floor(rarityData[selectedRarity]?.Die / 2)})
                </p>
                <p>
                  Random Number:{' '}
                  {Math.floor(
                    Math.random() *
                      Math.floor(rarityData[selectedRarity]?.Die / 2)
                  ) + 1}
                </p>
              </>
            ) : (
              <p>Waiting on Rarity Selection</p>
            )}
          </div>
          <div className='bg-gray-200 p-4 w-300 h-500'>
            <h2 className='text-lg font-bold mb-2'>BONUS REWARD</h2>
          </div>
          <div className='bg-gray-200 p-4 w-300 h-500'>
            <h2 className='text-lg font-bold mb-2'>BONUS REWARD</h2>
            <p>5% Chance</p>
            <div>
              {rollResult === null || rollResult < 95 ? (
                <p>No ticket: Needed a 95 or higher</p>
              ) : (
                <p>Won a Hunt Ticket with a {rollResult}</p>
              )}
            </div>
          </div>
          <div className='bg-gray-200 p-4 w-300 h-500'>
            <h2 className='text-lg font-bold mb-2'>SWAPPLING ORCHID</h2>
          </div>
          {/* Rest of the components */}
        </div>
      </div>
    </div>
  );
}

export default App;
