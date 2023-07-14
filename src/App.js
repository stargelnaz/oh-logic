import React, { useState } from 'react';
import teamData from './team.json';
import CalculateResult from './CalculateResult';

const App = () => {
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedBonusResourceAction, setSelectedBonusResourceAction] =
    useState(null);
  const [selectedRarity, setSelectedRarity] = useState(null);
  const [selectedSided, setSelectedSided] = useState(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState({});
  const [bonusTotal, setBonusTotal] = useState(0);
  const [randomNumber, setRandomNumber] = useState(null);
  const [orchidRandomNumber, setOrchidRandomNumber] = useState(null);
  const [bonusRandomNumber, setBonusRandomNumber] = useState(null);
  const [rarityDieRoll, setRarityDieRoll] = useState(null);

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

    const orchidRandom = Math.floor(Math.random() * 200) + 1;
    setOrchidRandomNumber(orchidRandom);

    const bonusRandomNumber = Math.floor(Math.random() * 100) + 1;
    setBonusRandomNumber(bonusRandomNumber);

    const rarityDieRoll = Math.floor((Math.random() * selectedSided) / 2) + 1;
    setRarityDieRoll(rarityDieRoll);
  };

  const handleActionClick = (resourceType) => {
    setSelectedAction(resourceType);

    const selectedActionItem = teamData.action.find(
      (actionItem) => actionItem.resourceType === resourceType
    );
    setSelectedBonusResourceAction(selectedActionItem.bonusResourceType);
  };

  const handleSubcategoryClick = (category, subcategoryValue) => {
    setSelectedSubcategories((prevSelectedSubcategories) => {
      const updatedSubcategories = {
        ...prevSelectedSubcategories,
        [category]: subcategoryValue
      };
      calculateTotalBonus(updatedSubcategories);
      return updatedSubcategories;
    });
  };

  const calculateTotalBonus = (updatedSubcategories) => {
    let total = 0;

    Object.values(updatedSubcategories).forEach((subcategoryValue) => {
      total += subcategoryValue;
    });

    setBonusTotal(total);
  };

  const diePower = selectedSided / 2; // This sets the max value when the die is rolled

  const orchidWinner = Math.ceil(diePower + (diePower * bonusTotal) / 100);

  const fuelMod = 0.25;
  const petalMod = 1;
  const foodMod = 0.5;

  const foodSlotReward = (
    ((randomNumber * rarityDieRoll) / 100 +
      (rarityDieRoll * bonusTotal) / 100) *
    foodMod
  ).toFixed(2);
  const petalSlotReward = (
    ((randomNumber * rarityDieRoll) / 100 +
      (rarityDieRoll * bonusTotal) / 100) *
    petalMod
  ).toFixed(2);
  const fuelSlotReward = (
    ((randomNumber * rarityDieRoll) / 100 +
      (rarityDieRoll * bonusTotal) / 100) *
    fuelMod
  ).toFixed(2);
  const foodBonusReward = (
    ((bonusRandomNumber * rarityDieRoll) / 100 +
      (rarityDieRoll * bonusTotal) / 100) *
    foodMod
  ).toFixed(2);
  const petalBonusReward = (
    ((bonusRandomNumber * rarityDieRoll) / 100 +
      (rarityDieRoll * bonusTotal) / 100) *
    petalMod
  ).toFixed(2);
  const fuelBonusReward = (
    ((bonusRandomNumber * rarityDieRoll) / 100 +
      (rarityDieRoll * bonusTotal) / 100) *
    fuelMod
  ).toFixed(2);

  return (
    <div className='flex'>
      <div className='w-1/2 bg-gray-800'>
        {/* ---------------------------------------------------------------------------------RESOURCE MODIFIERS */}
        <div id='Resource Modifiers' className='flex flex-wrap text-white '>
          <div className='p-2 border border-white text-xs'>
            Fuel Mod: {fuelMod}
          </div>
          <div className='p-2 border border-white text-xs'>
            Petal Mod: {petalMod}
          </div>
          <div className='p-2 border border-white text-xs'>
            Food Mod: {foodMod}{' '}
          </div>
        </div>
        <div className='flex flex-col justify-center h-screen'>
          <div className='text-white text-center'>
            <div>
              {/* ---------------------------------------------------------------------------------WHAT ACTION */}
              <p className='text-2xl font-bold'>
                REQUIREMENT 1: WHAT IS THE PRINCIPAL NFT TO BE USED FOR THE
                ACTION?
              </p>

              <div className='flex flex-row justify-center'>
                {teamData.action.map((actionItem, index) => (
                  <button
                    key={index}
                    className={`mx-2 py-1 px-4 rounded ${
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
              <p className='text-lg'>
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
                  : 'Must choose one'}
              </p>
            </div>
            <div className='py-2'>
              <p className='text-2xl font-bold'>
                REQUIREMENT 2: WHAT RARITY IS THE PRINCIPAL NFT?
              </p>

              <div className='flex flex-row justify-center'>
                {teamData.dice.map((diceItem, index) => (
                  <button
                    key={index}
                    className={`mx-2 py-1 px-4 rounded ${
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
                    }-sided dice`
                  : 'Choose a Rarity for more information'}{' '}
                | "Die Power" is a roll of that die divided in half
              </p>
            </div>
            <div className='py-2'>
              <p id='what-bonus' className='text-2xl font-bold'>
                REQUIREMENT 3: CALCULATE THE BONUS
              </p>
              <p>
                Because there will always a an active Land, at least the TERRAIN
                bonus will apply.
              </p>
              <div className='grid gap-4 grid-cols-1'>
                <div>
                  <h3>
                    Terrain (The chosen NFT in relation to the active land)
                  </h3>
                  {teamData.bonus.terrain.map((bonusItem, index) => (
                    <button
                      key={index}
                      className={`mx-2 py-1 px-4 rounded w-200 ${
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
                  <h3>
                    Partner (The relationship between GUIDE and BEAST, if there
                    is one)
                  </h3>
                  {teamData.bonus.partner.map((bonusItem, index) => (
                    <button
                      key={index}
                      className={`mx-2 py-1 px-4 rounded w-200 ${
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
                  <h3>
                    Vehicle (The relationship between VEHICLE and LAND, if there
                    is one)
                  </h3>
                  {teamData.bonus.vehicle.map((bonusItem, index) => (
                    <button
                      key={index}
                      className={`mx-2 py-1 px-4 rounded w-200 ${
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
                  <h3>
                    Coordination (If all three NFT match, regardless of LAND)
                  </h3>
                  {teamData.bonus.coordination.map((bonusItem, index) => (
                    <button
                      key={index}
                      className={`mx-2 py-1 px-4 rounded ${
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
                    className={`mx-2 py-1 px-4 rounded ${
                      selectedSubcategories['coordination'] === 0
                        ? 'bg-blue-500 text-black'
                        : 'bg-gray-500 text-gray-200'
                    }`}
                    onClick={() => handleSubcategoryClick('coordination', 0)}
                  >
                    Not Coordinated
                  </button>
                </div>
              </div>
              <p className='mt-4 text-3xl'>Total bonus is {bonusTotal}%</p>
            </div>

            <div className='flex flex-row'>
              {/* ----------------------------------------------------------------------------------RNG */}
              {/* MAIN ROLL */}
              <button
                className='py-1 px-4 bg-blue-500 text-white rounded'
                onClick={handleRollClick}
              >
                ROLL IT!
              </button>
              <div className='py-4 w-6/12'>
                <h2 className='text-2xl'>MAIN ROLL</h2>
                <div className='flex flex-col items-center'>
                  {randomNumber !== null && (
                    <div className='mt-4 text-3xl font-bold text-white'>
                      &nbsp;{randomNumber}&nbsp;
                    </div>
                  )}
                </div>
              </div>
              <div className='py-4 w-6/12'>
                <h2 className='text-2xl'>RARITY DIE ROLL</h2>
                <div className='flex flex-col items-center'>
                  {rarityDieRoll !== null && (
                    <div className='mt-4 text-3xl font-bold text-white'>
                      &nbsp;{rarityDieRoll}&nbsp;
                    </div>
                  )}
                </div>
              </div>

              {/* BONUS ROLL */}
              <div className='py-4 w-6/12'>
                <h2 className='text-2xl '>BONUS ROLL</h2>
                <div className='flex flex-col items-center'>
                  {bonusRandomNumber !== null && (
                    <div className='mt-4 text-3xl font-bold'>
                      &nbsp;{bonusRandomNumber}&nbsp;
                    </div>
                  )}
                </div>
              </div>
              {/* ORCHID ROLL */}
              <div className='py-4 w-6/12'>
                <h2 className='text-2xl '>ORCHID ROLL</h2>
                <div className='flex flex-col items-center'>
                  <div className='mt-4 text-3xl font-bold text-white'>
                    &nbsp;{orchidRandomNumber}&nbsp;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='right-side' className='w-1/2 flex flex-col bg-gray-200'>
        {/* --------------------------------------------------------------------------------SLOT RESULT */}{' '}
        <div
          id='slot result'
          className='flex flex-row border border-white bg-green-200'
        >
          <div className='flex flex-col w-1/3 m-2 p-2 bg-green-200'>
            <div className='flex flex-col font-bold text-2xl'>Slot Result</div>
            <div>
              <span className='font-bold'>HOW IS IT CALCULATED?</span>
            </div>
            <div>
              ( (Main Roll &times; Die Power) + (Die Power &times; Team Bonus) )
              &times; Resource Modifier
            </div>
          </div>
          <div className='flex flex-col w-2/3 m-2 p-2 bg-green-200'>
            <div className='bg-yellow-800 text-center text-white'>?</div>
            <div>
              <div>
                <table className='w-full'>
                  <tr>
                    <th className='w-1/6 border border-gray-400 p-2 text-center'>
                      Main Roll
                    </th>
                    <th className='w-1/6 border border-gray-400 p-2 text-center'>
                      Die Power <br /> d{selectedSided} ÷ 2
                    </th>

                    <th className='w-1/6 border border-gray-400 p-2 text-center'>
                      Team Bonus
                    </th>
                    <th className='w-1/6 border border-gray-400 p-2 text-center'>
                      Food
                    </th>
                    <th className='w-1/6 border border-gray-400 p-2 text-center'>
                      Petal
                    </th>
                    <th className='w-1/6 border border-gray-400 p-2 text-center'>
                      Fuel
                    </th>
                  </tr>
                  <tr>
                    <td
                      id='Main Roll'
                      className='w-1/6 border border-gray-400 p-2 text-center'
                      style={{
                        background: randomNumber ? 'inherit' : 'red',
                        color: randomNumber ? 'inherit' : 'white'
                      }}
                    >
                      {randomNumber ? `${randomNumber}` : 'Waiting on roll...'}
                    </td>

                    <td
                      id='Die Power'
                      className='w-1/6 border border-gray-400 p-2 text-center'
                      style={{
                        background: diePower ? 'inherit' : 'red',
                        color: diePower ? 'inherit' : 'white'
                      }}
                    >
                      {!diePower
                        ? 'Waiting on rarity...'
                        : !rarityDieRoll
                        ? 'Waiting on roll...'
                        : `${rarityDieRoll}`}
                    </td>

                    <td
                      id='Team Bonus'
                      className='w-1/6 border border-gray-400 p-2 text-center'
                      style={{
                        background: bonusTotal ? 'inherit' : 'red',
                        color: bonusTotal ? 'inherit' : 'white'
                      }}
                    >
                      {bonusTotal ? bonusTotal : 'No bonus'}
                    </td>

                    <td
                      id='Food'
                      className='w-1/6 border border-gray-400 p-2 text-center'
                    >
                      {foodSlotReward &&
                      (selectedAction === 'FOOD' || selectedAction === 'FUEL')
                        ? foodSlotReward
                        : ''}
                    </td>

                    <td
                      id='Petal'
                      className='w-1/6 border border-gray-400 p-2 text-center'
                    >
                      {petalSlotReward &&
                      (selectedAction === 'PETAL' || selectedAction === 'FUEL')
                        ? petalSlotReward
                        : ''}
                    </td>

                    <td
                      id='Fuel Slot Reward'
                      className='w-1/6 border border-gray-400 p-2 text-center'
                    >
                      {fuelSlotReward && selectedAction === 'FUEL'
                        ? fuelSlotReward
                        : ''}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>{' '}
        {/* --------------------------------------------------------------------------------BONUS RESULT */}
        <div
          id='Bonus Result'
          className='flex flex-row border border-white bg-green-300'
        >
          <div className='flex flex-col w-1/3 m-2 p-2 bg-green-300'>
            <div className='flex flex-col font-bold text-2xl'>Bonus Result</div>
            <div>
              <span className='font-bold'>HOW IS IT CALCULATED?</span>
            </div>
            <div>If MAIN ROLL &gt; 75 then RANDOM resource awarded</div>
            <div>
              {' '}
              ( (Bonus Roll &times; Die Power) <br />+ (Die Power &times; Team
              Bonus) )
              <br /> &times; Resource Modifier
            </div>
          </div>
          <div className='flex flex-col w-2/3 m-2 p-2 bg-green-300'>
            <div className='bg-yellow-800 text-center text-white'>
              DID YOU WIN? (Main Roll > 75?)
            </div>
            <div>
              <div>
                {/* <table className='mx-auto border border-collapse'> */}
                <table className='w-full'>
                  <tr>
                    <th className='w-1/6 border border-gray-400 p-2 text-center'>
                      Bonus Roll
                    </th>
                    <th className='w-1/6 border border-gray-400 p-2 text-center'>
                      Die Power
                      <br /> d{selectedSided} &divide; 2
                    </th>
                    <th className='w-1/6 border border-gray-400 p-2 text-center'>
                      Team Bonus
                    </th>
                    <th className='w-1/6 border border-gray-400 p-2 text-center'>
                      Food
                    </th>
                    <th className='w-1/6 border border-gray-400 p-2 text-center'>
                      Petal
                    </th>
                    <th className='w-1/6 border border-gray-400 p-2 text-center'>
                      Fuel
                    </th>
                  </tr>
                  <tr>
                    <td
                      id='Bonus Roll'
                      className='border border-gray-400 p-2 text-center'
                      style={{
                        background: bonusRandomNumber ? 'inherit' : 'red',
                        color: bonusRandomNumber ? 'inherit' : 'white'
                      }}
                    >
                      {bonusRandomNumber
                        ? bonusRandomNumber
                        : 'Waiting on roll'}
                    </td>

                    <td
                      id='Die Power'
                      className='w-1/6 border border-gray-400 p-2 text-center'
                      style={{
                        background: diePower ? 'inherit' : 'red',
                        color: diePower ? 'inherit' : 'white'
                      }}
                    >
                      {!diePower
                        ? 'Waiting on rarity...'
                        : !rarityDieRoll
                        ? 'Waiting on roll...'
                        : `${rarityDieRoll}`}
                    </td>
                    <td
                      id='Team Bonus'
                      className='w-1/6 border border-gray-400 p-2 text-center'
                      style={{
                        background: bonusTotal ? 'inherit' : 'red',
                        color: bonusTotal ? 'inherit' : 'white'
                      }}
                    >
                      {bonusTotal ? bonusTotal : 'No bonus'}
                    </td>
                    <td
                      id='Food'
                      className='w-1/6 border border-gray-400 p-2 text-center'
                    >
                      {foodBonusReward &&
                      (selectedAction === 'FOOD' || selectedAction === 'FUEL')
                        ? foodBonusReward
                        : ''}
                    </td>

                    <td
                      id='Petal'
                      className='w-1/6 border border-gray-400 p-2 text-center'
                    >
                      {petalBonusReward &&
                      (selectedAction === 'PETAL' || selectedAction === 'FUEL')
                        ? petalBonusReward
                        : ''}
                    </td>

                    <td
                      id='Fuel Slot Reward'
                      className='w-1/6 border border-gray-400 p-2 text-center'
                    >
                      {fuelBonusReward && selectedAction === 'FUEL'
                        ? fuelBonusReward
                        : ''}
                    </td>
                  </tr>
                </table>
              </div>
            </div>

            {randomNumber === 0 ||
            randomNumber === null ||
            randomNumber === undefined ? (
              <span className='bg-yellow-800 text-center text-white'>
                Waiting for input...
              </span>
            ) : randomNumber < 75 ? (
              <span className='bg-yellow-800 text-center text-white'>NOPE</span>
            ) : (
              <span className='opacity-100 bg-orange-500 text-center text-white'>
                WINNER
              </span>
            )}
          </div>
        </div>
        {/* --------------------------------------------------------------------------------SWAPLING RESULT */}{' '}
        <div className='flex flex-row border border-white bg-green-400'>
          <div className='flex flex-col w-1/2 m-2 p-2 w-1/3 bg-green-400'>
            <div className='flex flex-col font-bold  text-2xl'>
              Swapling Orchid Result
            </div>
            <div>
              <span className='font-bold'>(FUTURE) HOW IS IT CALCULATED?</span>
            </div>
            <div>
              <div>
                The ORCHID ROLL is generated independently of any other roll.
              </div>
              <div>The gamer's chances are based soley on rarity</div>
            </div>
          </div>
          <div className='flex flex-col m-2 p-2 w-2/3 bg-green-400'>
            <div className='bg-yellow-800 text-center text-white'>
              DID YOU WIN?
            </div>
            <div>
              <div>
                <table>
                  <tr>
                    <th className='border border-gray-400 p-2 text-center'>
                      Orchid Roll
                    </th>
                    <th>&lt;</th>
                    <th className='border border-gray-400 p-2 text-center'>
                      Rarity Die &divide; 2
                    </th>
                    <th>
                      NOTE: Because we aren't using floats in the code, the roll
                      is 1-200, so effectively the odds are die/4
                    </th>
                  </tr>
                  <tr>
                    <td className='border border-gray-400 p-2 text-center'>
                      {randomNumber === null ||
                      randomNumber === 0 ||
                      randomNumber === undefined
                        ? 'Waiting'
                        : orchidRandomNumber}
                    </td>
                    <td></td>
                    <td className='border border-gray-400 p-2 text-center'>
                      {selectedSided === null ||
                      selectedSided === 0 ||
                      selectedSided === undefined
                        ? 'Waiting'
                        : diePower}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div>
              {orchidRandomNumber ? (
                diePower > orchidRandomNumber ? (
                  <div className='opacity-100 bg-orange-500 text-center text-white'>
                    WINNER!
                  </div>
                ) : (
                  <div className='bg-yellow-800 text-center text-white'>
                    NOPE
                  </div>
                )
              ) : (
                <div className='opacity-100 bg-yellow-800 text-center text-white'>
                  WAITING ON ROLL
                </div>
              )}
            </div>
          </div>
        </div>{' '}
        {/* --------------------------------------------------------------------------------TICKET RESULT */}{' '}
        <div className='flex flex-row border border-white bg-green-500'>
          <div className='flex flex-col w-1/3 m-2 p-2 bg-green-500'>
            <div className='flex flex-col font-bold text-2xl'>
              Hunt Ticket Result
            </div>
            <div>
              <span className='font-bold'>HOW IS IT CALCULATED?</span>
            </div>
            <div>
              <div>Success if the MAIN ROLL is greater than 95</div>
            </div>
          </div>
          <div className='flex flex-col m-2 p-2 bg-green-500'>
            <div className='bg-yellow-800 text-center text-white'>
              DID YOU WIN?
            </div>
            <div>
              <div>
                {/* <table className='mx-auto border border-collapse'> */}
                <table>
                  <tr>
                    <th className='border border-gray-400 p-2 text-center'>
                      Main Roll > 95?
                    </th>
                  </tr>
                  <tr>
                    <td className='border border-gray-400 p-2 text-center'>
                      {randomNumber === null ||
                      randomNumber === 0 ||
                      randomNumber === undefined
                        ? 'Waiting'
                        : randomNumber}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div>
              {randomNumber > 95 ? (
                <div className='opacity-100 bg-orange-500 text-center text-white'>
                  WINNER!
                </div>
              ) : (
                <div className='bg-yellow-800 text-center text-white'>NOPE</div>
              )}
            </div>
          </div>
        </div>
        {/* --------------------------------------------------------------------------------VARIABLES */}{' '}
        <div className='flex flex-col m-5 p-6 border border-blue-500'>
          <div>https://github.com/stargelnaz/oh-logic.git</div>
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
