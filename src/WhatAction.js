// WhatAction.js
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

const WhatAction = ({ selectedAction, handleActionClick }) => {
  let actionText = 'Choose an Action';

  if (selectedAction === 'HUNT') {
    actionText = 'HUNT uses a CLAN MEMBER (FOOD)';
  } else if (selectedAction === 'GATHER') {
    actionText = 'GATHER uses a CLAN BEAST (PETAL)';
  } else if (selectedAction === 'HUNT_GATHER') {
    actionText = 'HUNT & GATHER uses a VEHICLE (ALL)';
  }

  return (
    <div className='flex flex-col items-center justify-center bg-white border border-black p-4'>
      <div className='mb-4 text-3xl'>WHAT ACTION?</div>
      <div>
        <button
          style={{
            ...buttonStyle,
            backgroundColor:
              selectedAction === 'HUNT' ? 'green' : buttonStyle.backgroundColor
          }}
          onClick={() => handleActionClick('HUNT')}
        >
          HUNT
        </button>
        <button
          style={{
            ...buttonStyle,
            backgroundColor:
              selectedAction === 'GATHER'
                ? 'green'
                : buttonStyle.backgroundColor
          }}
          onClick={() => handleActionClick('GATHER')}
        >
          GATHER
        </button>
        <button
          style={{
            ...buttonStyle,
            backgroundColor:
              selectedAction === 'HUNT_GATHER'
                ? 'green'
                : buttonStyle.backgroundColor
          }}
          onClick={() => handleActionClick('HUNT_GATHER')}
        >
          HUNT & GATHER
        </button>
      </div>
      <div className='mt-4'>{actionText}</div>
    </div>
  );
};

export default WhatAction;
