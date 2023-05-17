// WhatRarity.js
import React from 'react';

const buttonStyle = {
  backgroundColor: '#61dafb',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  padding: '8px 16px',
  margin: '4px',
  cursor: 'pointer'
};

const WhatRarity = ({ selectedRarity, handleRarityClick }) => {
  let rarityText = 'Choose a Rarity';
  let raritySided;

  if (selectedRarity === 'COMMON') {
    rarityText = 'Common uses a 4-sided die for bonus calculations';
    raritySided = 4;
  } else if (selectedRarity === 'UNCOMMON') {
    rarityText = 'Uncommon uses a 6-sided die for bonus calculations';
    raritySided = 6;
  } else if (selectedRarity === 'RARE') {
    rarityText = 'Rare uses a 8-sided die for bonus calculations';
    raritySided = 8;
  } else if (selectedRarity === 'EPIC') {
    rarityText = 'Epic uses a 10-sided die for bonus calculations';
    raritySided = 10;
  } else if (selectedRarity === 'LEGENDARY') {
    rarityText = 'Legendary uses a 12-sided die for bonus calculations';
    raritySided = 12;
  } else if (selectedRarity === 'GHOST') {
    raritySided = 20;
    rarityText = 'Ghost uses a 20-sided die for bonus calculations';
  }

  return (
    <div className='flex flex-col items-center justify-center bg-white border border-black p-4'>
      <div className='text-3xl'>WHAT RARITY?</div>
      <div>
        <button
          style={{
            ...buttonStyle,
            backgroundColor:
              selectedRarity === 'COMMON'
                ? 'green'
                : buttonStyle.backgroundColor
          }}
          onClick={() => handleRarityClick('COMMON')}
        >
          COMMON
        </button>
        <button
          style={{
            ...buttonStyle,
            backgroundColor:
              selectedRarity === 'UNCOMMON'
                ? 'green'
                : buttonStyle.backgroundColor
          }}
          onClick={() => handleRarityClick('UNCOMMON')}
        >
          UNCOMMON
        </button>
        <button
          style={{
            ...buttonStyle,
            backgroundColor:
              selectedRarity === 'RARE' ? 'green' : buttonStyle.backgroundColor
          }}
          onClick={() => handleRarityClick('RARE')}
        >
          RARE
        </button>
        <button
          style={{
            ...buttonStyle,
            backgroundColor:
              selectedRarity === 'EPIC' ? 'green' : buttonStyle.backgroundColor
          }}
          onClick={() => handleRarityClick('EPIC')}
        >
          EPIC
        </button>
        <button
          style={{
            ...buttonStyle,
            backgroundColor:
              selectedRarity === 'LEGENDARY'
                ? 'green'
                : buttonStyle.backgroundColor
          }}
          onClick={() => handleRarityClick('LEGENDARY')}
        >
          LEGENDARY
        </button>
        <button
          style={{
            ...buttonStyle,
            backgroundColor:
              selectedRarity === 'GHOST' ? 'green' : buttonStyle.backgroundColor
          }}
          onClick={() => handleRarityClick('GHOST')}
        >
          GHOST
        </button>
      </div>
      <div className='mt-4'>{rarityText}</div>
    </div>
  );
};

export default WhatRarity;
