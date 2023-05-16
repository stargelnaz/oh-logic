// TeamDetails.js
import React, { useState } from 'react';
import WhatAction from './WhatAction';
import WhatRarity from './WhatRarity';

function TeamDetails({ setSelectedRarityProp }) {
  // Rename the prop to avoid conflicts
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('');

  const handleActionClick = (action) => {
    setSelectedAction(action);
  };

  const handleRarityClick = (rarity) => {
    setSelectedRarity(rarity);
    updateSelectedRarity(rarity); // Call the prop function to update selectedRarity in App.js
  };

  return (
    <>
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
    </>
  );
}

export default TeamDetails;
