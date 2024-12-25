/*this component create scenario section in the main page*/

import Flow from './Flow';
import HorizontalSwiper from './HorizontalSwiper';
import SectionCore from './SectionCore';

export default function Scenarios({ data, flow, setter }) {
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
