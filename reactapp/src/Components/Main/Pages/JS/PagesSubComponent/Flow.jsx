/*this component create flow section in the main page and also decide which flow user want to choose and also decide the flow button state*/

import storeInLocalStorage from './StoreInLocalStorage';

export default function Flow({ flow, data }) {
  // Function to handle updates to the section flow
  const func = (e) => {
    const id = e.target.id;
    data[1]((prev) => {
      const newState = {
        ...prev,
        [flow]: { ...prev[flow], Flow: id }
      };
      storeInLocalStorage(newState); // Update localStorage
      return newState;
    });
  };

  const toggleBTN = (e) => {
    data[1]((prev) => {
      const newState = {
        ...prev,
        [flow]: {
          ...prev[flow],
          BTN: !prev[flow]?.BTN // Toggle the BTN value
        }
      };
      storeInLocalStorage(newState); // Update localStorage
      return newState;
    });

    setTimeout(() => {
      data[1]((prev) => {
        const newState = {
          ...prev,
          [flow]: {
            ...prev[flow],
            BTN: false // Reset the BTN value after timeout
          }
        };
        storeInLocalStorage(newState); // Update localStorage
        return newState;
      });
    }, 4999);
  };

  return (
    <>
      <div className={`choice-box `}>
        <span
          id={`${flow}-toggle-btn`}
          className="toggle-flow fa-solid fa-circle-exclamation"
          onClick={toggleBTN}
        ></span>

        <ul
          className={`choice-box-list ${data[0][flow].BTN ? 'open-choice-box' : 'close-choice-box'}`}
        >
          <li>
            <label htmlFor={`${flow}-normal-flow`}>
              <i className="fa-solid fa-arrow-down"></i>
              <input
                type="radio"
                id={`${flow}-normal-flow`}
                name={`${flow}-flow`}
                checked={data[0][flow].Flow === `${flow}-normal-flow`}
                onChange={func}
              />
            </label>
          </li>
          <li>
            <label htmlFor={`${flow}-vertical-flow`}>
              <i className="fa-solid fa-arrow-up"></i>
              <input
                type="radio"
                id={`${flow}-vertical-flow`}
                name={`${flow}-flow`}
                checked={data[0][flow].Flow === `${flow}-vertical-flow`}
                onChange={func}
              />
            </label>
          </li>
          <li>
            <label htmlFor={`${flow}-horizontal-flow`}>
              <i className="fa-solid fa-arrow-right"></i>
              <input
                type="radio"
                id={`${flow}-horizontal-flow`}
                name={`${flow}-flow`}
                checked={data[0][flow].Flow === `${flow}-horizontal-flow`}
                onChange={func}
              />
            </label>
          </li>
        </ul>
      </div>
    </>
  );
}
