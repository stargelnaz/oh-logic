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
    { label: 'Matching Land', value: 20 },
    { label: 'Affiliated Land', value: 10 },
    { label: 'Awkward Land', value: -25 }
  ],
  partner: [
    { label: 'Matching Partner', value: 10 },
    { label: 'Affiliated Partner', value: 5 },
    { label: 'Awkward Partner', value: -10 },
    { label: 'Rival Partner', value: -25 }
  ],
  vehicle: [
    { label: 'Matching Vehicle', value: 10 },
    { label: 'Affiliated Vehicle', value: 5 },
    { label: 'Awkward Vehicle', value: -10 },
    { label: 'Rival Vehicle', value: -25 }
  ],
  coordination: [{ label: 'Matching Team of 3', value: 10 }]
};

function CalculateTeamBonus() {
  const [selectedBonuses, setSelectedBonuses] = useState([]);

  const handleBonusClick = (bonusValue) => {
    setSelectedBonuses([bonusValue]);
  };

  const calculateTotal = () => {
    return selectedBonuses.reduce((total, bonus) => total + bonus, 0);
  };

  return (
    <div className='flex flex-col bg-white'>
      <div>
        <h2>The Team Bonus is: {calculateTotal()}</h2>
      </div>
      <div id='Condition 1'>
        <h3>TERRAIN BONUS</h3>
        {bonuses.terrain.map((bonus) => (
          <button
            key={bonus.label}
            style={buttonStyle}
            onClick={() => handleBonusClick(bonus.value)}
          >
            {bonus.label}
          </button>
        ))}
      </div>
      <div id='Condition 2'>
        <h3>PARTNER BONUS</h3>
        {bonuses.partner.map((bonus) => (
          <button
            key={bonus.label}
            style={buttonStyle}
            onClick={() => handleBonusClick(bonus.value)}
          >
            {bonus.label}
          </button>
        ))}
      </div>
      <div id='Condition 3'>
        <h3>VEHICLE BONUS</h3>
        {bonuses.vehicle.map((bonus) => (
          <button
            key={bonus.label}
            style={buttonStyle}
            onClick={() => handleBonusClick(bonus.value)}
          >
            {bonus.label}
          </button>
        ))}
      </div>
      <div id='Condition 4'>
        <h3>TEAM COORDINATION</h3>
        {bonuses.coordination.map((bonus) => (
          <button
            key={bonus.label}
            style={buttonStyle}
            onClick={() => handleBonusClick(bonus.value)}
          >
            {bonus.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CalculateTeamBonus;
