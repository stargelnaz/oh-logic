import React, { useState, useEffect, useCallback } from 'react';
import WhatAction from './WhatAction';
import WhatRarity from './WhatRarity';
import WhatBonus from './WhatBonus';
import rarityData from './rarity.json';

function App() {
  const [rollResult, setRollResult] = useState(null);
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('');
  const [calculateSwappling, setCalculateSwappling] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [bonusType, setBonusType] = useState('');
  const [raritySided, setRaritySided] = useState('');

  const calculateReward = useCallback(() => {
    if (rollResult) {
      const guaranteedValue = (rollResult / 50 - 1) * 0.75 + 1.25;
      return guaranteedValue.toFixed(1);
    }
    return '';
  }, [rollResult]);

  useEffect(() => {
    if (calculateReward()) {
      const swapplingResult = Math.floor(Math.random() * 100) + 1;
      setCalculateSwappling(swapplingResult);
    }
  }, [calculateReward]);

  const rollDice = () => {
    const result = Math.floor(Math.random() * 100) + 1;
    setRollResult(result);
  };

  const extraReward =
    selectedRarity && rarityData[selectedRarity]
      ? Math.floor(
          Math.random() * Math.floor(rarityData[selectedRarity].sided / 2)
        ) + 1
      : 0;

  const totalRewards = parseFloat(calculateReward()) + extraReward;

  const handleActionClick = (action) => {
    setSelectedAction(action);
    if (action === 'HUNT') {
      setResourceType('FOOD');
      setBonusType('PETAL');
    } else if (action === 'GATHER') {
      setResourceType('PETAL');
      setBonusType('FOOD');
    } else if (action === 'EXPEDITION') {
      setResourceType('BOTH');
      setBonusType('BOTH');
    }
  };

  const handleRarityClick = (rarity) => {
    setSelectedRarity(rarity);
  };

  const huntTicket =
    rollResult === null
      ? 'Waiting on Roll'
      : rollResult < 95
      ? 'NOPE'
      : 'WINNER';

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-black border border-gold'>
      <div className='flex flex-wrap flex-row'>
        <div>
          <WhatAction
            selectedAction={selectedAction}
            handleActionClick={handleActionClick}
            resourceType={resourceType}
          />
          <WhatRarity
            selectedRarity={selectedRarity}
            handleRarityClick={handleRarityClick}
          />
          <WhatBonus />
        </div>
      </div>

      <div className='flex flex-col items-center justify-center p-b m-4 bg-white border border-black p-4'>
        <h1 className='text-4xl bg-white'>MAIN ROLL FOR PAYOUT</h1>
        <button
          className='px-4 py-2 bg-blue-500 text-white rounded-md mb-4'
          onClick={rollDice}
        >
          Roll the Dice
        </button>
        {rollResult && <p className='text-2xl'>Result: {rollResult}</p>}
      </div>
      <div>
        {/* ------------------------------------------------------------------SLOT REWARDS */}
        <div className='bg-gray-200 p-4'>
          <div className='flex flext-rowtext-lg font-bold'>
            SLOT REWARD: {totalRewards} {resourceType}
          </div>
          <p className='text-sm italic'>
            REQUIRES: action type, rarity, team bonus
          </p>

          {calculateReward() ? (
            <p>
              Base Reward: {calculateReward()} {resourceType}
            </p>
          ) : (
            <p>Waiting on Roll</p>
          )}
          {selectedRarity ? (
            <>
              <p>
                Extra Rewards = RARITY * (TEAM BONUS as a %) to be successful;
                then bell curve for reward .25 to 1/2d: {extraReward}{' '}
                {resourceType}
              </p>
            </>
          ) : (
            <p>Waiting on Rarity Selection</p>
          )}
        </div>

        {/* ------------------------------------------------------------------BONUS REWARDS */}
        <div className='bg-gray-200 p-4 w-300 h-500'>
          <div className='text-lg font-bold'>BONUS REWARD OF {bonusType}</div>
          <p className='text-sm italic'>
            REQUIRES: action type, team bonus, and successful Extra Rewards roll
          </p>
          <p>Need 50 or higher</p>
        </div>
        <div className='bg-gray-200 p-4 w-300 h-500'>
          {/* ------------------------------------------------------------------HUNT TICKET */}{' '}
          <h2 className='text-lg font-bold'>HUNT TICKET: {huntTicket} </h2>
          <p className='text-sm italic'>REQUIRES: main roll</p>
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
          {/* ------------------------------------------------------------------SWAPPLING */}
          <div className='text-lg font-bold mb-2'>SWAPPLING ORCHID: NOPE</div>
          <p className='text-sm italic'>
            REQUIRES: main roll, rarity, swappling roll
          </p>
          <p>Swappling Roll: {calculateSwappling}</p>
          <p>Rarity: {raritySided}</p>

          {/* calculate </p> */}
        </div>
      </div>
    </div>
  );
}

export default App;
