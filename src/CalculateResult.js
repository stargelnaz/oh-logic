import React from 'react';

const CalculateResult = ({ randomNumber, selectedSided }) => {
  const result = (randomNumber * selectedSided) / 100;

  return (
    <div>
      <p>The result is: {result}</p>
    </div>
  );
};

export default CalculateResult;
