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
  let resourceType = '';

  if (selectedAction === 'HUNT') {
    actionText = 'HUNT uses a CLAN MEMBER (FOOD)';
    resourceType = 'FOOD';
  } else if (selectedAction === 'GATHER') {
    actionText = 'GATHER uses a CLAN BEAST (PETAL)';
    resourceType = 'PETAL';
  } else if (selectedAction === 'EXPEDITION') {
    actionText = 'EXPEDITION uses a VEHICLE (BOTH)';
    resourceType = 'BOTH';
  }
  console.log(resourceType);
  return (
    <div className='flex flex-col items-center justify-center bg-white border border-black p-4'>
      <div className='text-2xl'>WHAT ACTION?</div>
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
              selectedAction === 'EXPEDITION'
                ? 'green'
                : buttonStyle.backgroundColor
          }}
          onClick={() => handleActionClick('EXPEDITION')}
        >
          EXPEDITION
        </button>
      </div>
      <div className='mt-4'>{actionText.replace('FOOD', resourceType)}</div>
    </div>
  );
};

export default WhatAction;
