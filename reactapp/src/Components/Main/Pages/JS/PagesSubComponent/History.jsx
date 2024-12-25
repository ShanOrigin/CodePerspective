// Component to create History section in main page

import Flow from './Flow';
import HorizontalSwiper from './HorizontalSwiper';
import SectionCore from './SectionCore';

export default function History({ data, flow, setter }) {
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

// import Flow from './Flow';
// import HorizontalSwiper from './HorizontalSwiper';
// import SectionCore from './SectionCore';

// export default function History({ data, flow, sectionFlow, dispatch }) {
//   return (
//     <>
//       <section id="History" className="history-section section">
//         {Object.keys(data.History.Inventors).length > 1 && (
//           <>
//             <Flow flow={flow} sectionFlow={sectionFlow} dispatch={dispatch} />
//           </>
//         )}

//         <h2 className="sub-title">History :</h2>
//         <div id={`${Object.keys(data.History)[0]}`}>
//           {sectionFlow[flow].Flow === `${flow}-normal-flow` && (
//             <div className="normal-flow">
//               <SectionCore which={flow} data={data} />
//             </div>
//           )}
//           {sectionFlow[flow].Flow === `${flow}-vertical-flow` && (
//             <h1>vertical flow </h1>
//           )}
//           {sectionFlow[flow].Flow === `${flow}-horizontal-flow` && (
//             <div className="horizontal-flow">
//               <HorizontalSwiper section={flow} data={data} />
//             </div>
//           )}
//         </div>
//       </section>
//       <hr />
//     </>
//   );
// }
