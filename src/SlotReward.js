// SlotReward.js
import React from 'react';

const SlotReward = ({ rollResult, selectedRarity }) => {
  const guaranteedValue = (rollResult / 50 - 1) * 0.75 + 1.25;

  return (
    <div className='bg-gray-200 p-4 w-300 h-500'>
      <h2 className='text-lg font-bold mb-2'>SLOT REWARD</h2>
      Base Reward: {guaranteedValue.toFixed(1)} UNITS
      <br />
      Extra Reward: Based on Rarity {selectedRarity}
    </div>
  );
};

export default SlotReward;
