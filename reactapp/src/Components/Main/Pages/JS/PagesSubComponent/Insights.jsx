/*this component create insights section or advantages and disadvantages section in the main page*/

import Flow from './Flow';
import HorizontalSwiper from './HorizontalSwiper';
import SectionCore from './SectionCore';

export default function Insights({ data, flow, setter }) {
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
