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
  const [orchidRandomNumber, setOrchidRandomNumber] = useState(null);
  const [bonusRandomNumber, setBonusRandomNumber] = useState(null);
  const [resourceRandomNumber, setResourceRandomNumber] = useState(null);

  const handleRarityClick = (rarity) => {
    const selectedDice = teamData.dice.find(
      (diceItem) => diceItem.rarity === rarity
    );
    setSelectedRarity(rarity);
    setSelectedSided(selectedDice.sided);
  };
  const handleRollClick = () => {
    const random = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(random);

    const orchidRandom = Math.floor(Math.random() * 100) + 1;
    setOrchidRandomNumber(orchidRandom);

    const bonusRandomNumber = Math.floor(Math.random() * 100) + 1;
    setBonusRandomNumber(bonusRandomNumber);

    const resourceRandom = Math.floor((Math.random() * selectedSided) / 2) + 1;
    setResourceRandomNumber(resourceRandom);
  };

  const handleActionClick = (resourceType) => {
    setSelectedAction(resourceType);
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
  const diePower = selectedSided / 2;

  const orchidWinner = Math.ceil(diePower + (diePower * bonusTotal) / 100);

  const slotReward = (
    (randomNumber / 100) * diePower +
    diePower * (bonusTotal / 100)
  ).toFixed(2);

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
                  ? `${selectedRarity}s use ${
                      teamData.dice.find(
                        (diceItem) => diceItem.rarity === selectedRarity
                      ).sided
                    }-sided die`
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

            <div className='flex flex-row'>
              {/* MAIN DICE ROLL */}
              <button
                className='py-2 px-4 bg-blue-500 text-white rounded'
                onClick={handleRollClick}
              >
                ROLL IT!
              </button>
              <div className='py-4 w-6/12'>
                <h2 className='text-2xl font-bold'>MAIN DICE ROLL</h2>
                <div className='flex flex-col items-center'>
                  {randomNumber !== null && (
                    <div className='mt-4 text-3xl font-bold text-white'>
                      &nbsp;{randomNumber}&nbsp;
                    </div>
                  )}
                </div>
              </div>

              {/* BONUS DICE ROLL */}
              <div className='py-4 w-6/12'>
                <h2 className='text-2xl '>BONUS DICE ROLL</h2>
                <div className='flex flex-col items-center'>
                  {bonusRandomNumber !== null && (
                    <div className='mt-4 text-3xl font-bold text-gray-500'>
                      &nbsp;{bonusRandomNumber}&nbsp;
                    </div>
                  )}
                </div>
              </div>
              {/* ORCHID DICE ROLL */}
              <div className='py-4 w-6/12'>
                <h2 className='text-2xl '>ORCHID DICE ROLL</h2>
                <div className='flex flex-col items-center'>
                  {orchidRandomNumber !== null && (
                    <div className='mt-4 text-3xl font-bold text-white'>
                      &nbsp;{orchidRandomNumber}&nbsp;
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='w-1/2 bg-gray-200'>
        {/* --------------------------------------------------------------------------------SLOT RESULT */}{' '}
        <div className='flex flex-col m-5 p-6 border border-white bg-green-200'>
          <div className='font-bold text-2xl'>Slot Result</div>
          <p>
            <span className='font-bold text-gray-600'>
              Factors: Main Dice Roll, Selected Sided, Selected Resource
            </span>
          </p>
          <p>
            <span className='font-bold'>HOW IS IT CALCULATED?</span>Guaranteed
            amount resources. Rarity die is multiplied by
          </p>
          <div className='bg-yellow-800'>WHAT DID YOU WIN?</div>
          <div>
            <div>
              {/* <table className='mx-auto border border-collapse'> */}
              <table>
                <tr>
                  <th className='border border-gray-400 p-2 text-center'>
                    Main Roll
                  </th>
                  <th className='border border-gray-400 p-2 text-center'>
                    {selectedSided}-sided Roll
                  </th>
                  <th className='border border-gray-400 p-2 text-center'>
                    Team Bonus
                  </th>
                </tr>
                <tr>
                  <td className='border border-gray-400 p-2 text-center'>
                    {randomNumber}%
                  </td>
                  <td className='border border-gray-400 p-2 text-center'>
                    {resourceRandomNumber}
                  </td>
                  <td className='border border-gray-400 p-2 text-center'>
                    {bonusTotal}%
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div>Slot Reward: {slotReward}</div>
        </div>
        {/* --------------------------------------------------------------------------------BONUS RESULT */}
        <div className='flex flex-col m-5 p-6 border border-white bg-green-300'>
          <div className='font-bold text-2xl'>Bonus Resource Result</div>
          <p>
            <span className='font-bold text-gray-600'>
              Factors: Main Dice Roll, Bonus Dice Roll
            </span>
          </p>
          <p>
            <span className='font-bold'>HOW IS IT CALCULATED?</span> If the MAIN
            DICE ROLL is greater than 75% then a BONUS ROLL will determine the
            resources won
          </p>

          <div>
            {randomNumber === null ||
            randomNumber === 0 ||
            randomNumber === undefined ? (
              <div>BONUS RESULT: Waiting on Dice Roll...</div>
            ) : randomNumber > 75 ? (
              <div>
                <div className='bg-yellow-500'>BONUS RESULT: WINNER!</div>
                <div className='bg-yellow-800'>WHAT DID YOU WIN?</div>
              </div>
            ) : (
              <div className='bg-red-500'>BONUS RESULT: Nope</div>
            )}
          </div>
        </div>
        {/* --------------------------------------------------------------------------------SWAPLING RESULT */}
        <div className='flex flex-col m-5 p-6 border border-white bg-green-400'>
          <div className='font-bold text-2xl'>Swapling Orchid Result</div>
          <p>
            <span className='font-bold text-gray-600'>
              Factors: Orchid Die Roll, Die Power, Team Bonus
            </span>
          </p>
          <p>
            <span className='font-bold'>HOW IS SUCCESS CALCULATED?</span>A new
            roll orchidRoll is generated. Success if the Orchid Die Roll &le;
            diePower (1/2 of Rarity Die) + teamPower (diePower * bonusPower)
          </p>
          <p>
            {selectedRarity === null || selectedRarity === undefined ? (
              <div>Waiting on rarity selection...</div>
            ) : (
              <div>Die power is {diePower}</div>
            )}

            <div
              className={`${
                bonusTotal < 0
                  ? 'bg-red-500 text-white'
                  : 'bg-transparent text-black'
              }`}
            >
              Team power is {bonusTotal}%
            </div>

            <div>orchidWinner is {orchidWinner}</div>
            <div>orchidRandomNumber is {orchidRandomNumber}</div>
          </p>

          <div>
            {orchidWinner === null ||
            orchidWinner === 0 ||
            orchidWinner === undefined ? (
              <div>TICKET RESULT: Waiting on Dice Roll</div>
            ) : orchidRandomNumber <= orchidWinner ? (
              <div className='bg-yellow-500'>TICKET RESULT: WINNER!</div>
            ) : (
              <div className='bg-red-500'>TICKET RESULT: Nope</div>
            )}
          </div>
        </div>
        {/* --------------------------------------------------------------------------------TICKET RESULT */}
        <div className='flex flex-col m-5 p-6 border border-white bg-green-500'>
          <div className='font-bold text-2xl'>Hunt Ticket Result</div>
          <p>
            <span className='font-bold text-gray-600'>
              Factors: Main Dice Roll
            </span>
          </p>
          <p>
            <span className='font-bold'>HOW IS IT CALCULATED?</span> If the MAIN
            DICE ROLL is > 95
          </p>

          <div>
            {randomNumber === null ||
            randomNumber === 0 ||
            randomNumber === undefined ? (
              <div>TICKET RESULT: Waiting on Main Dice Roll...</div>
            ) : randomNumber > 95 ? (
              <div className='bg-yellow-500'>TICKET RESULT: WINNER!</div>
            ) : (
              <div className='bg-red-500'>TICKET RESULT: Nope</div>
            )}
          </div>
        </div>
        {/* --------------------------------------------------------------------------------VARIABLES */}{' '}
        <div className='flex flex-col m-5 p-6 border border-blue-500'>
          <div>selectedAction: {selectedAction}</div>
          <div>
            selectedRarity: {selectedRarity} → selectedSided: {selectedSided} →
            diePower: {diePower}
          </div>

          <div>bonusTotal: {bonusTotal}%</div>
          <div>
            randomNumber: {randomNumber} → bonusRandomNumber:
            {bonusRandomNumber} → orchidRandomNumber: {orchidRandomNumber}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
