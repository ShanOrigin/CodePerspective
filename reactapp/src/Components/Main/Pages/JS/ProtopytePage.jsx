import { useEffect, useState, useMemo, useRef } from 'react';
import 'swiper/css';
import data from './data';
import '../CSS/TypePage.css';
import '../CSS/TypePage_mobile.css';

import '../CSS/TypePage_verticalFlow.css';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import { useLocation, useParams } from 'react-router-dom';

function HorizontalSwiper({ section, data }) {
  const loc = useLocation();
  console.log(loc);
  const controller = {
    'history-section': HistorySectionCore
  };
  return (
    <>
      <Swiper
        spaceBetween={10}
        pagination={true}
        modules={[Pagination]}
        className="mySwiper"
      >
        {SectionCore({ which: section, data: data }).map((slide) => (
          <SwiperSlide>{slide} </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

function GuideSection(key, value) {
  if (typeof value === 'object' && value !== null) {
    return (
      <>
        <ul className="sub-tree">
          {/*
          <li>
            <i class="fa-solid fa-arrow-down"></i>{' '}
          </li>
					*/}

          {Object.entries(value).map(([ikey, ivalue]) => (
            <li>
              <div class="branch">
                <span class="leaves"></span> <a href={`#${ikey}`}>{ikey}</a>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  }
  return null; // Handle non-object values by returning null or desired fallback
}

function Concept({ data }) {
  return (
    <>
      <section id="Concept" className="concept-section section">
        <h2 className="sub-title">Defination :</h2>
        {data.Concept?.Definition?.image && (
          <img
            className="photo"
            src={`/${data.Concept.Definition.image}`}
            alt={`${data.Concept.Definition.image}`}
          />
        )}
        {Object.entries(data.Concept?.Definition?.definition || {}).map(
          ([key, value], i) => (
            <p key={key}>
              {i == 0 ? <span></span> : ''}
              {value}
            </p>
          )
        )}
      </section>

      <hr />
    </>
  );
}

function SectionCore({ which, data }) {
  switch (which) {
    case 'history-section': {
      const slides = Object.entries(data.History?.Inventors || {}).map(
        ([key, value]) => {
          const content = (
            <div key={key} className="inventor-card">
              <figure>
                {value?.image && (
                  <img
                    className="photo inventor-img"
                    src={`/${value.image}`}
                    alt={`${value.inventor} image`}
                  />
                )}
                {value?.inventor && (
                  <figcaption className="inventor-name">
                    <em>{value.inventor}</em>
                  </figcaption>
                )}
              </figure>
              {value?.contributions && (
                <p className="contribution">{value.contributions}</p>
              )}
            </div>
          );

          // Return an array of SwiperSlide if swiper is true, else return regular content
          return content;
        }
      );

      // Return the array of slides or content
      return slides;
    }

    case 'purpose-section': {
      const slides = Object.entries(data['Purpose Importance'] || {}).map(
        ([key, value], i) => {
          const content = (
            <div
              className="qna-card"
              key={key}
              id={`${Object.keys(data['Purpose Importance'])[i]}`}
            >
              <h3 className="question">{key}</h3>
              <p className="answer">{value.text}</p>

              {/*value.image && (
                    <img src={value.image} alt={`${key} image`} />
                  ) */}
            </div>
          );
          return content;
        }
      );
      return slides;
    }

    case 'types-section': {
      const slides = Object.entries(data?.Types || {}).map(
        ([key, value], i) => {
          const content = (
            <div
              key={key}
              className="types-card"
              id={`${Object.keys(data.Types)[i]}`}
            >
              {key && <h3 className="types-title">{key}</h3>}

              {value?.image && (
                <img
                  className="photo types-img "
                  src={`/${value.image}`}
                  alt={`${key} image`}
                />
              )}

              {value?.info && <p className="types-info">{value.info}</p>}
            </div>
          );

          return content;
        }
      );

      return slides;
    }
    case 'explanation-section': {
      const slides = Object.entries(data?.Explanation || {}).map(
        ([step, value], i) => {
          const content = (
            <div
              key={i}
              className="explanation-card"
              id={`${Object.keys(data.Explanation)[i]}`}
            >
              <h3 className="explanation-steps">{` ${step} : `}</h3>

              {value.image && (
                <img
                  className="steps-image"
                  src={`/${value.image}`}
                  alt={` Explanation  ${step} image`}
                />
              )}
              <p className="step-explanation">{value.text}</p>
            </div>
          );
          return content;
        }
      );

      return slides;
    }

    case 'insights-section': {
      const slides = [
        data.Insights?.Advantages && (
          <div className="advdis-card" id={`${Object.keys(data.Insights)[0]}`}>
            <h3 className="advdis-title">Advantages</h3>
            {Object.values(data.Insights.Advantages).map((adv, idx) => (
              <p className="advdis-points" key={idx}>
                <span>{`${idx + 1} ). `}</span>
                {adv}
              </p>
            ))}
          </div>
        ),

        data.Insights?.Disadvantages && (
          <div className="advdis-card" id={`${Object.keys(data.Insights)[1]}`}>
            <h3 className="advdis-title">Disadvantages</h3>
            {Object.values(data.Insights.Disadvantages).map((disadv, idx) => (
              <p className="advdis-points" key={idx}>
                <span>{`${idx + 1} ). `}</span>
                {disadv}
              </p>
            ))}
          </div>
        )
      ];

      return slides;
    }

    case 'useCase-section': {
      const slides = Object.entries(data['Use Cases'] || {}).map(
        ([key, value], i) => {
          const content = (
            <div
              className="usecase-card"
              key={key}
              id={`${Object.keys(data['Use Cases'])[i]}`}
            >
              <p className="case">{key}</p>
              <p className="case-info">{value.text}</p>
              {/*value.image && (
                  <img src={value.image} alt={`Use case ${key}`} />
                )*/}
            </div>
          );
          return content;
        }
      );

      return slides;
    }
    case 'keyAspects-section': {
      const slides = [
        data['Key Aspects']['Time Complexity'] && (
          <div
            className="aspects-card"
            id={`${Object.keys(data['Key Aspects'])[0]}`}
          >
            <h3 className="aspects-title">Time Complexity</h3>
            {Object.entries(data['Key Aspects']['Time Complexity']).map(
              ([aspect, details]) => (
                <div key={aspect}>
                  <h4 className="aspect-title">{aspect} :</h4>
                  <p className="aspect-info">{details.text}</p>
                </div>
              )
            )}
          </div>
        ),
        <>
          <hr className="aspect-seperator" />
          {data['Key Aspects']['Space Complexity'] && (
            <div
              className="aspects-card"
              id={`${Object.keys(data['Key Aspects'])[1]}`}
            >
              <h3 className="aspects-title">Space Complexity</h3>
              {Object.entries(data['Key Aspects']['Space Complexity']).map(
                ([aspect, details]) => (
                  <div key={aspect}>
                    <h4 className="aspect-title">{aspect} :</h4>
                    <p className="aspect-info">{details.text}</p>
                  </div>
                )
              )}
            </div>
          )}
        </>,
        <>
          <hr className="aspect-seperator" />
          {data['Key Aspects']['Limitations'] && (
            <div
              className="aspects-card"
              id={`${Object.keys(data['Key Aspects'])[2]}`}
            >
              <h3 className="aspects-title">Limitations</h3>
              {Object.values(data['Key Aspects']['Limitations']).map(
                (limitation, idx) => (
                  <p className="aspect-title" key={idx}>
                    {limitation.text}
                  </p>
                )
              )}
            </div>
          )}
        </>
      ];

      return slides;
    }
    case 'scenarios-section': {
      const slides = Object.entries(data.Scenarios || {}).map(
        ([scenarioType, scenarioDetails], i) => {
          const content = (
            <div
              className="scenarios-card"
              key={scenarioType}
              id={`${Object.keys(data.Scenarios)[i]}`}
            >
              <h3 className="scenarios-title">{scenarioType}</h3>

              {scenarioDetails.image && (
                <img
                  className="photo scenarios-image"
                  src={`/${scenarioDetails.image}`}
                  alt={`${scenarioType} image`}
                />
              )}

              <p className="scenarios-explanation">
                {scenarioDetails.explanation}
              </p>
            </div>
          );
          return content;
        }
      );
      return slides;
    }
  }
}

function HistorySectionCore({ data }) {
  const slides = Object.entries(data.History?.Inventors || {}).map(
    ([key, value]) => {
      const content = (
        <div key={key} className="inventor-card">
          <figure>
            {value?.image && (
              <img
                className="photo inventor-img"
                src={`/${value.image}`}
                alt={`${value.inventor} image`}
              />
            )}
            {value?.inventor && (
              <figcaption className="inventor-name">
                <em>{value.inventor}</em>
              </figcaption>
            )}
          </figure>
          {value?.contributions && (
            <p className="contribution">{value.contributions}</p>
          )}
        </div>
      );

      // Return an array of SwiperSlide if swiper is true, else return regular content
      return content;
    }
  );

  // Return the array of slides or content
  return slides;
}

function History({ data, flow, setter }) {
  const [sectionFlow, setSectionFlow] = setter;

  return (
    <>
      <section id="History" className="history-section section">
        {Object.keys(data.History.Inventors).length > 1 && (
          <>
            <Flow flow={flow} data={[sectionFlow, setSectionFlow]} />
          </>
        )}

        <h2 className="sub-title">History :</h2>
        <div id={`${Object.keys(data.History)[0]}`}>
          {sectionFlow[flow].Flow === `${flow}-normal-flow` && (
            <div className="normal-flow">
              <SectionCore which={flow} data={data} />
            </div>
          )}
          {sectionFlow[flow].Flow === `${flow}-vertical-flow` && (
            <h1>vertical flow </h1>
          )}
          {sectionFlow[flow].Flow === `${flow}-horizontal-flow` && (
            <div className="horizontal-flow">
              <HorizontalSwiper section={flow} data={data} />
            </div>
          )}
        </div>
      </section>
      <hr />
    </>
  );
}

function Types({ data, flow, setter }) {
  const [sectionFlow, setSectionFlow] = setter;

  return (
    <>
      <section id="Types" className="types-section section">
        {Object.keys(data.Types).length > 1 && (
          <Flow flow={flow} data={[sectionFlow, setSectionFlow]} />
        )}

        <h2 className="sub-title">Types</h2>

        {sectionFlow[flow].Flow === `${flow}-normal-flow` && (
          <div className="normal-flow">
            <SectionCore which={flow} data={data} />
          </div>
        )}
        {sectionFlow[flow].Flow === `${flow}-vertical-flow` && (
          <h1>Applying Vertical Flow</h1>
        )}
        {sectionFlow[flow].Flow === `${flow}-horizontal-flow` && (
          <div className="horizontal-flow">
            <HorizontalSwiper section={flow} data={data} />
          </div>
        )}
      </section>
      <hr />
    </>
  );
}

function PurposeImportance({ data, flow, setter }) {
  const [sectionFlow, setSectionFlow] = setter;

  return (
    <>
      <section
        id="Purpose Importance"
        className="purpose-importance-section section"
      >
        {Object.keys(data['Purpose Importance']).length > 1 && (
          <>
            <Flow flow={flow} data={[sectionFlow, setSectionFlow]} />
          </>
        )}

        <h2 className="sub-title">Purpose And Importance</h2>

        {sectionFlow[flow].Flow === `${flow}-normal-flow` && (
          <div className="normal-flow">
            <SectionCore which={flow} data={data} />
          </div>
        )}
        {sectionFlow[flow].Flow === `${flow}-vertical-flow` && (
          <h1>Applying Vertical Flow</h1>
        )}
        {sectionFlow[flow].Flow === `${flow}-horizontal-flow` && (
          <div className="horizontal-flow">
            <HorizontalSwiper section={flow} data={data} />
          </div>
        )}
      </section>
      <hr />
    </>
  );
}

function Flow({ flow, data }) {
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
    }, 5000);
  };

  return (
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
  );
}

function Explanation({ data, flow, setter }) {
  const [sectionFlow, setSectionFlow] = setter;

  return (
    <>
      <section id="Explanation" className="explanation-section section">
        {Object.keys(data.Explanation).length > 1 && (
          <>
            <Flow flow={flow} data={[sectionFlow, setSectionFlow]} />
          </>
        )}

        <h2 className="sub-title">Explanation</h2>

        {sectionFlow[flow].Flow === `${flow}-normal-flow` && (
          <div className="normal-flow">
            <SectionCore which={flow} data={data} />
          </div>
        )}
        {sectionFlow[flow].Flow === `${flow}-vertical-flow` && (
          <h1>Applying Vertical Flow</h1>
        )}
        {sectionFlow[flow].Flow === `${flow}-horizontal-flow` && (
          <div className="horizontal-flow">
            <HorizontalSwiper section={flow} data={data} />
          </div>
        )}
      </section>
      <hr />
    </>
  );
}

function Insights({ data, flow, setter }) {
  const [sectionFlow, setSectionFlow] = setter;
  return (
    <>
      <section
        id="Insights"
        className="advantages-disadvantages-section section"
      >
        {Object.keys(data.Insights).length > 1 && (
          <>
            <Flow flow={flow} data={[sectionFlow, setSectionFlow]} />
          </>
        )}
        <h2 className="sub-title">Advantages And Disadvantages</h2>

        {sectionFlow[flow].Flow === `${flow}-normal-flow` && (
          <div className="normal-flow">
            <SectionCore which={flow} data={data} />
          </div>
        )}
        {sectionFlow[flow].Flow === `${flow}-vertical-flow` && (
          <h1>Applying Vertical Flow</h1>
        )}
        {sectionFlow[flow].Flow === `${flow}-horizontal-flow` && (
          <div className="horizontal-flow">
            <HorizontalSwiper section={flow} data={data} />
          </div>
        )}
      </section>
      <hr />
    </>
  );
}

function UseCase({ data, flow, setter }) {
  const [sectionFlow, setSectionFlow] = setter;

  return (
    <>
      <section id="Use Cases" className="usecase-section section">
        {Object.keys(data['Use Cases']).length > 1 && (
          <Flow flow={flow} data={[sectionFlow, setSectionFlow]} />
        )}
        <h2 className="sub-title">Use Cases</h2>

        {sectionFlow[flow].Flow === `${flow}-normal-flow` && (
          <div className="normal-flow">
            <SectionCore which={flow} data={data} />
          </div>
        )}
        {sectionFlow[flow].Flow === `${flow}-vertical-flow` && (
          <h1>Applying Vertical Flow</h1>
        )}
        {sectionFlow[flow].Flow === `${flow}-horizontal-flow` && (
          <div className="horizontal-flow">
            <HorizontalSwiper section={flow} data={data} />
          </div>
        )}
      </section>
      <hr />
    </>
  );
}

function KeyAspects({ data, flow, setter }) {
  const [sectionFlow, setSectionFlow] = setter;

  return (
    <>
      <section id="Key Aspects" className="key-aspects-section section">
        {Object.keys(data['Key Aspects']).length > 1 && (
          <Flow flow={flow} data={[sectionFlow, setSectionFlow]} />
        )}
        <h2 className="sub-title">Key Aspects</h2>

        {sectionFlow[flow].Flow === `${flow}-normal-flow` && (
          <div className="normal-flow">
            <SectionCore which={flow} data={data} />
          </div>
        )}
        {sectionFlow[flow].Flow === `${flow}-vertical-flow` && (
          <h1>Applying Vertical Flow</h1>
        )}
        {sectionFlow[flow].Flow === `${flow}-horizontal-flow` && (
          <div className="horizontal-flow">
            <HorizontalSwiper section={flow} data={data} />
          </div>
        )}
      </section>
      <hr />
    </>
  );
}

function Scenarios({ data, flow, setter }) {
  const [sectionFlow, setSectionFlow] = setter;
  return (
    <>
      <section id="Scenarios" className="scenarios-section section">
        {Object.keys(data.Scenarios).length > 1 && (
          <Flow flow={flow} data={[sectionFlow, setSectionFlow]} />
        )}
        <h2 className="sub-title">Scenarios </h2>

        {sectionFlow[flow].Flow === `${flow}-normal-flow` && (
          <div className="normal-flow">
            <SectionCore which={flow} data={data} />
          </div>
        )}
        {sectionFlow[flow].Flow === `${flow}-vertical-flow` && (
          <h1>Applying Vertical Flow</h1>
        )}
        {sectionFlow[flow].Flow === `${flow}-horizontal-flow` && (
          <div className="horizontal-flow">
            <HorizontalSwiper section={flow} data={data} />
          </div>
        )}
      </section>
    </>
  );
}

function Guide(obj1, obj2) {
  return Object.entries(obj1).map(([key, value]) => {
    const search = key.split(' ').map((e) => e.toLowerCase());

    const inSearch = Object.keys(obj2);
    const found = inSearch.some((e) =>
      search.some((s) =>
        e.includes(s) && obj2[e].Flow == `${e}-normal-flow` ? true : false
      )
    );
    if (found) {
      return key;
    }
  });
}

function Guider({ data, sectionData }) {
  const [toggleGuideBtn, setToggleGuideBtn] = useState(false);

  // Memoizing Guide function to prevent unnecessary calls on each render
  const guideList = useMemo(() => {
    console.log('in memo Function ', sectionData);
    return Guide(data, sectionData);
  }, [sectionData]); // Recalculate only when sectionFlow changes

  const toggleGuide = () => {
    console.log('toggle guide');
    setToggleGuideBtn((toggleGuideBtn) => !toggleGuideBtn);

    setTimeout(() => {
      setToggleGuideBtn(false);
    }, 8000);
  };

  return (
    <>
      <span
        onClick={toggleGuide}
        className={`guide-toggle fa-solid fa-circle-exclamation `}
      ></span>
      <div
        className={`side-bar  ${toggleGuideBtn ? 'open-guide' : 'close-guide'} `}
      >
        <h2>Guide</h2>
        <aside className="Tree">
          {Object.entries(data).map(([key, value]) => (
            <div className="guide-section">
              <section class="branch">
                <span class="leaves"></span>

                <h4>
                  <a href={`#${key}`}>{key} </a>
                </h4>
              </section>

              {guideList.includes(key) && GuideSection(key, value)}
            </div>
          ))}
        </aside>
      </div>
    </>
  );
}

export default function LocationDisplay() {
  const locs = useParams();
  console.log(locs);

  const [sectionFlow, setSectionFlow] = useState(() => {
    // Retrieve the state from localStorage if available
    const storedState = localStorage.getItem('sectionFlow');
    return storedState
      ? JSON.parse(storedState)
      : {
          'purpose-section': {
            Flow: 'purpose-section-normal-flow',
            BTN: false
          },
          'history-section': {
            Flow: 'history-section-normal-flow',
            BTN: false
          },
          'types-section': { Flow: 'types-section-normal-flow', BTN: false },
          'explanation-section': {
            Flow: 'explanation-section-normal-flow',
            BTN: false
          },
          'insights-section': {
            Flow: 'insights-section-normal-flow',
            BTN: false
          },
          'useCase-section': {
            Flow: 'useCase-section-normal-flow',
            BTN: false
          },
          'keyAspects-section': {
            Flow: 'keyAspects-section-normal-flow',
            BTN: false
          },
          'scenarios-section': {
            Flow: 'scenarios-section-normal-flow',
            BTN: false
          }
        };
  });

  useEffect(() => {
    // Load state from localStorage when the component mounts
    const savedState = JSON.parse(localStorage.getItem('sectionFlow'));
    console.log('savedState state from localStorage', savedState);
    if (savedState) {
      setSectionFlow(savedState); // Set the state from localStorage
    }
  }, []);

  if (!data) return <p>No data available</p>;

  return (
    <>
      <div>
        <p>baseType : {locs?.baseType}</p>
        <p> types : {locs?.types} </p>
        <p>type : {locs?.type}</p>
        <p>operation : {locs.operation}</p>
      </div>
      <div className="page-container">
        <Guider data={data} sectionData={sectionFlow} />

        <aside className="page">
          <h1 className="page-title">{data.Concept?.Definition?.name}</h1>
          {/* Defination section */}

          <Concept data={data} />
          {/* History and Background section */}
          <History
            data={data}
            flow={'history-section'}
            setter={[sectionFlow, setSectionFlow]}
          />

          {/* Types  section */}
          <Types
            data={data}
            flow={'types-section'}
            setter={[sectionFlow, setSectionFlow]}
          />

          {/* Purpose and Importance section */}

          <PurposeImportance
            data={data}
            flow={'purpose-section'}
            setter={[sectionFlow, setSectionFlow]}
          />

          {/* Details section */}

          <Explanation
            data={data}
            flow={'explanation-section'}
            setter={[sectionFlow, setSectionFlow]}
          />

          {/* Advantages Disadvantages section */}

          <Insights
            data={data}
            flow={'insights-section'}
            setter={[sectionFlow, setSectionFlow]}
          />

          {/*  Use Cases section */}

          <UseCase
            data={data}
            flow={'useCase-section'}
            setter={[sectionFlow, setSectionFlow]}
          />

          {/* Key Aspects  section */}

          <KeyAspects
            data={data}
            flow={'keyAspects-section'}
            setter={[sectionFlow, setSectionFlow]}
          />

          {/* Scenarios section */}

          <Scenarios
            data={data}
            flow={'scenarios-section'}
            setter={[sectionFlow, setSectionFlow]}
          />
        </aside>
      </div>
    </>
  );
}

// Function to store state in localStorage
function storeInLocalStorage(newState) {
  localStorage.setItem('sectionFlow', JSON.stringify(newState));
}
