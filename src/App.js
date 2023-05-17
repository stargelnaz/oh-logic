import React, { useState } from 'react';
import teamData from './team.json';
import CalculateResult from './CalculateResult';
const App = () => {
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedRarity, setSelectedRarity] = useState(null);
  const [selectedSided, setSelectedSided] = useState(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState({});
  const [bonusTotal, setBonusTotal] = useState(0);
  const [randomNumber, setRandomNumber] = useState(null);

  const handleRollClick = () => {
    const random = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(random);
  };

  const handleActionClick = (resourceType) => {
    setSelectedAction(resourceType);
  };

  const handleRarityClick = (rarity) => {
    const selectedDice = teamData.dice.find(
      (diceItem) => diceItem.rarity === rarity
    );
    setSelectedRarity(rarity);
    setSelectedSided(selectedDice.sided);
  };

  const handleSubcategoryClick = (category, subcategoryValue) => {
    setSelectedSubcategories((prevSelectedSubcategories) => ({
      ...prevSelectedSubcategories,
      [category]: subcategoryValue
    }));

    calculateTotalBonus(); //
  };

  const calculateTotalBonus = () => {
    let total = 0;

    Object.values(selectedSubcategories).forEach((subcategoryValue) => {
      total += subcategoryValue;
    });

    setBonusTotal(total);
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
                  : 'Choose an Action for more information'}
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
                  : 'Choose a Rarity for more information'}
              </p>
            </div>
            <div className='py-4'>
              <h2 className='text-2xl font-bold'>WHAT BONUS?</h2>
              <div className='grid gap-4 grid-cols-1'>
                <div>
                  <h3>Terrain</h3>
                  {teamData.bonus.terrain.map((bonusItem, index) => (
                    <button
                      key={index}
                      className={`mx-2 py-2 px-4 rounded w-200 ${
                        selectedSubcategories['terrain'] === bonusItem.value
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-500 text-gray-200'
                      }`}
                      onClick={() =>
                        handleSubcategoryClick('terrain', bonusItem.value)
                      }
                    >
                      {bonusItem.label}
                    </button>
                  ))}
                </div>
                <div>
                  <h3>Partner</h3>
                  {teamData.bonus.partner.map((bonusItem, index) => (
                    <button
                      key={index}
                      className={`mx-2 py-2 px-4 rounded w-200 ${
                        selectedSubcategories['partner'] === bonusItem.value
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-500 text-gray-200'
                      }`}
                      onClick={() =>
                        handleSubcategoryClick('partner', bonusItem.value)
                      }
                    >
                      {bonusItem.label}
                    </button>
                  ))}
                </div>
                <div>
                  <h3>Vehicle</h3>
                  {teamData.bonus.vehicle.map((bonusItem, index) => (
                    <button
                      key={index}
                      className={`mx-2 py-2 px-4 rounded w-200 ${
                        selectedSubcategories['vehicle'] === bonusItem.value
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-500 text-gray-200'
                      }`}
                      onClick={() =>
                        handleSubcategoryClick('vehicle', bonusItem.value)
                      }
                    >
                      {bonusItem.label}
                    </button>
                  ))}
                </div>
                <div>
                  <h3>Coordination</h3>
                  {teamData.bonus.coordination.map((bonusItem, index) => (
                    <button
                      key={index}
                      className={`mx-2 py-2 px-4 rounded ${
                        selectedSubcategories['coordination'] ===
                        bonusItem.value
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-500 text-gray-200'
                      }`}
                      onClick={() =>
                        handleSubcategoryClick('coordination', bonusItem.value)
                      }
                    >
                      {bonusItem.label}
                    </button>
                  ))}
                  <button
                    className={`mx-2 py-2 px-4 rounded ${
                      selectedSubcategories['coordination'] === 0
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-500 text-gray-200'
                    }`}
                    onClick={() => handleSubcategoryClick('coordination', 0)}
                  >
                    Not Coordinated
                  </button>
                </div>
              </div>
              <p className='mt-4 text-lg'>Total bonus is {bonusTotal}</p>
            </div>

            <div className='py-4'>
              <h2 className='text-2xl font-bold'>MAIN DICE ROLL</h2>
              <div className='flex flex-col items-center'>
                <button
                  className='py-2 px-4 bg-blue-500 text-white rounded'
                  onClick={handleRollClick}
                >
                  ROLL IT!
                </button>
                {randomNumber !== null && (
                  <div className='mt-4 text-3xl font-bold text-white'>
                    &nbsp;{randomNumber}&nbsp;
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='w-1/2 bg-gray-200'>
        <div className='flex flex-col m-5 p-6 border border-blue-500'>
          <div>Selected Action Resource: {selectedAction}</div>
          <div>Selected Rarity: {selectedRarity}</div>
          <div>Selected Sided: {selectedSided}</div>
          <div>Total Bonus: {bonusTotal}</div>
          <div>Main Dice Roll (n/100): {randomNumber}</div>
        </div>

        <div className='flex flex-col m-5 p-6 border border-white bg-blue-300'>
          <div className='font-bold text-2xl'>Slot Result</div>
          <p>
            <span className='font-bold text-gray-600'>
              Factors: Main Dice Roll, Selected Sided, Selected Resource
            </span>
          </p>
          <p>
            <span className='font-bold'>HOW IS IT CALCULATED?</span> A bell
            curve based on the main dice roll will choose a value between 0.5
            and the selectedSided value divided in half.
          </p>
          <div>
            <CalculateResult
              randomNumber={randomNumber}
              selectedSided={selectedSided}
            />
          </div>
        </div>
        <div>
          SLOT RESULTS:
          <p className='italic'>
            These results are based on the ACTION that was chosen.
            <br /> It will produce the associated RESOURCE in various amounts
            ranging from 0.25 to the RARITY DIE then divided in half
            <br />
            The concept is that the Guide, Beast will be looking for their
            primary resource. Only that resource will show in the SLOT RESULTS
          </p>
        </div>
        <div>BONUS RESULTS:</div>
        <p className='italic'>
          These results are based on a much smaller chance of finding something
          OTHER than the resource associated with the ACTION. The idea here is
          that occassionally while looking for FOOD a GUIDE may find PETAL.
          However, the BONUS RESULTS can be improved based on the TEAM BONUSES
        </p>
        {/* --------------------------------------------------------------------------------SWAPLING RESULT */}
        <div className='flex flex-col m-5 p-6 border border-white bg-blue-300'>
          <div className='font-bold text-2xl'>Swapling Orchid Result</div>
          <p>
            <span className='font-bold text-gray-600'>
              Factors: Orchid Dice Roll, Selected Sided, Team Bonus
            </span>
          </p>
          <p>
            <span className='font-bold'>HOW IS IT CALCULATED?</span> Orchid Roll
            &le; selectedSided * bonusTotal
          </p>
          <div>
            {randomNumber === null ||
            randomNumber === 0 ||
            randomNumber === undefined ? (
              <div>TICKET RESULT: Waiting on Main Dice Roll...</div>
            ) : randomNumber > 95 ? (
              <div>TICKET RESULT: WINNER!</div>
            ) : (
              <div>TICKET RESULT: Nope</div>
            )}
          </div>
        </div>

        {/* --------------------------------------------------------------------------------TICKET RESULT */}
        <div className='flex flex-col m-5 p-6 border border-white bg-blue-300'>
          <div className='font-bold text-2xl'>Hunt Ticket Result</div>
          <p>
            <span className='font-bold text-gray-600'>
              Factors: Main Dice Roll
            </span>
          </p>
          <p>
            <span className='font-bold'>HOW IS IT CALCULATED?</span> If the roll
            is > 95
          </p>
          <div>
            {randomNumber === null ||
            randomNumber === 0 ||
            randomNumber === undefined ? (
              <div>TICKET RESULT: Waiting on Main Dice Roll...</div>
            ) : randomNumber > 95 ? (
              <div>TICKET RESULT: WINNER!</div>
            ) : (
              <div>TICKET RESULT: Nope</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
