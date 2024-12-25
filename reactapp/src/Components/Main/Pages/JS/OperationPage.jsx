import { useEffect, useState } from 'react';
//import data from './data';
import '../CSS/TypePage.css';
import '../CSS/TypePage_mobile.css';

import '../CSS/TypePage_verticalFlow.css';

import { useLocation, useParams } from 'react-router-dom';

// import of sections

import Concept from './PagesSubComponent/Concept';

import History from './PagesSubComponent/History';

import Types from './PagesSubComponent/Types';

import PurposeImportance from './PagesSubComponent/Purpose';

import Explanation from './PagesSubComponent/Explanation';

import Insights from './PagesSubComponent/Insights';

import UseCase from './PagesSubComponent/UseCases';

import KeyAspects from './PagesSubComponent/KeyAspects';

import Scenarios from './PagesSubComponent/scenarios';

import Guider from './PagesSubComponent/Guide';

import Animation from './PagesSubComponent/Animation';

export default function TypesPage({ data }) {
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
          },
          'animation-section': {
            Flow: 'animation-section-normal-flow',
            BTN: false
          },
          'related-section': {
            Flow: 'related-section-normal-flow',
            BTN: false
          }
        };
  });
  //   useEffect(() => {
  //     const savedState = JSON.parse(localStorage.getItem('sectionFlow'));
  //     console.log('savedState state from localStorage', savedState);
  //     if (
  //       savedState &&
  //       JSON.stringify(savedState) !== JSON.stringify(sectionFlow)
  //     ) {
  //       setSectionFlow(savedState); // Only set if the state is different
  //     }
  //   }, [sectionFlow]); // This will only run if `sectionFlow` changes

  console.log('parent component render');
  console.log(sectionFlow);
  if (data === null) return <p>Loading.,..</p>;

  return (
    <>
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
          {/*Animation section */}
          <Animation />

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
