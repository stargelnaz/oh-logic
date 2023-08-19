import React, { useState } from 'react';

const buttonStyle = {
  backgroundColor: '#61dafb',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  padding: '8px 16px',
  margin: '4px',
  cursor: 'pointer'
};

const bonuses = {
  terrain: [
    { label: 'Matching Land +35', value: 35 },
    { label: 'Affiliated Land +10', value: 10 },
    { label: 'Awkward Land -25', value: -25 },
    { label: 'Rival Land -50', value: -50 }
  ],
  partner: [
    { label: 'Matching Partner +10', value: 10 },
    { label: 'Affiliated Partner +5', value: 5 },
    { label: 'Awkward Partner -10', value: -10 },
    { label: 'Rival Partner -25', value: -25 }
  ],
  vehicle: [
    { label: 'Matching Vehicle +10', value: 10 },
    { label: 'Affiliated Vehicle +5', value: 5 },
    { label: 'Awkward Vehicle -10', value: -10 },
    { label: 'Rival Vehicle -25', value: -25 }
  ],
  coordination: [{ label: 'All Matching Team +10', value: 10 }]
};

function WhatBonus() {
  const [selectedBonuses, setSelectedBonuses] = useState({
    terrain: 0,
    partner: 0,
    vehicle: 0,
    coordination: 0
  });

  const handleBonusClick = (category, bonusValue) => {
    setSelectedBonuses((prevBonuses) => ({
      ...prevBonuses,
      [category]: prevBonuses[category] === bonusValue ? 0 : bonusValue
    }));
  };

  const calculateTotal = () => {
    return Object.values(selectedBonuses).reduce(
      (total, bonus) => total + bonus,
      0
    );
  };

  return (
    <div className='flex flex-col items-center justify-center bg-white border border-black p-4'>
      <div>
        <div className='text-3xl'>WHAT BONUS?</div>{' '}
        <div>The Team Bonus is: {calculateTotal()}</div>
      </div>
      <div id='category 1'>
        <div>TERRAIN BONUS</div>
        {bonuses.terrain.map((bonus) => (
          <button
            key={bonus.label}
            style={{
              ...buttonStyle,
              backgroundColor:
                selectedBonuses.terrain === bonus.value
                  ? 'green'
                  : buttonStyle.backgroundColor
            }}
            onClick={() => handleBonusClick('terrain', bonus.value)}
          >
            {bonus.label}
          </button>
        ))}
      </div>
      <div id='category 2'>
        <h3>PARTNER BONUS</h3>
        {bonuses.partner.map((bonus) => (
          <button
            key={bonus.label}
            style={{
              ...buttonStyle,
              backgroundColor:
                selectedBonuses.partner === bonus.value
                  ? 'green'
                  : buttonStyle.backgroundColor
            }}
            onClick={() => handleBonusClick('partner', bonus.value)}
          >
            {bonus.label}
          </button>
        ))}
      </div>
      <div id='category 3'>
        <h3>VEHICLE BONUS</h3>
        {bonuses.vehicle.map((bonus) => (
          <button
            key={bonus.label}
            style={{
              ...buttonStyle,
              backgroundColor:
                selectedBonuses.vehicle === bonus.value
                  ? 'green'
                  : buttonStyle.backgroundColor
            }}
            onClick={() => handleBonusClick('vehicle', bonus.value)}
          >
            {bonus.label}
          </button>
        ))}
      </div>
      <div id='category 4'>
        <h3>TEAM COORDINATION</h3>
        {bonuses.coordination.map((bonus) => (
          <button
            key={bonus.label}
            style={{
              ...buttonStyle,
              backgroundColor:
                selectedBonuses.coordination === bonus.value
                  ? 'green'
                  : buttonStyle.backgroundColor
            }}
            onClick={() => handleBonusClick('coordination', bonus.value)}
          >
            {bonus.label}
          </button>
        ))}
      </div>
    </div>
  );
}
export default WhatBonus;
