import React, { useState } from 'react';
import teamData from './team.json';

const App = () => {
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedRarity, setSelectedRarity] = useState(null);

  const handleActionClick = (resourceType) => {
    setSelectedAction(resourceType);
  };

  const handleRarityClick = (rarity) => {
    setSelectedRarity(rarity);
  };

  return (
    <div className='flex'>
      <div className='w-1/2 bg-gray-800'>
        <div className='flex flex-col justify-center h-screen'>
          <div className='text-white text-center'>
            <div className='py-4'>
              <h2 className='text-2xl font-bold'>WHAT ACTION?</h2>
              <div className='flex flex-row justify-center'>
                {teamData.action.map((actionItem, index) => (
                  <button
                    key={index}
                    className={`mx-2 py-2 px-4 rounded ${
                      selectedAction === actionItem.resourceType
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-500 text-gray-200'
                    }`}
                    onClick={() => handleActionClick(actionItem.resourceType)}
                  >
                    {actionItem.actionType}
                  </button>
                ))}
              </div>
              <p className='mt-4 text-lg'>
                {selectedAction
                  ? `${
                      teamData.action.find(
                        (actionItem) =>
                          actionItem.resourceType === selectedAction
                      ).nftType
                    }'s go on ${
                      teamData.action.find(
                        (actionItem) =>
                          actionItem.resourceType === selectedAction
                      ).actionType
                    }s looking for ${selectedAction}`
                  : 'Choose an Action'}
              </p>
            </div>
            <div className='py-4'>
              <h2 className='text-2xl font-bold'>WHAT RARITY?</h2>
              <div className='flex flex-row justify-center'>
                {teamData.dice.map((diceItem, index) => (
                  <button
                    key={index}
                    className={`mx-2 py-2 px-4 rounded ${
                      selectedRarity === diceItem.rarity
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-500 text-gray-200'
                    }`}
                    onClick={() => handleRarityClick(diceItem.rarity)}
                  >
                    {diceItem.rarity}
                  </button>
                ))}
              </div>
              <p className='mt-4 text-lg'>
                {selectedRarity
                  ? `${selectedRarity}'s use ${
                      teamData.dice.find(
                        (diceItem) => diceItem.rarity === selectedRarity
                      ).sided
                    }-sided dice`
                  : 'Choose a Rarity'}
              </p>
            </div>
            <div className='py-4'>
              <h2 className='text-2xl font-bold'>WHAT BONUS?</h2>
            </div>
            <div className='py-4'>
              <h2 className='text-2xl font-bold'>MAIN DICE ROLL</h2>
            </div>
          </div>
        </div>
      </div>
      <div className='w-1/2 bg-gray-200'></div>
    </div>
  );
};

export default App;
