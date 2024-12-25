/*this component create key aspects section in the main page*/

import Flow from './Flow';
import HorizontalSwiper from './HorizontalSwiper';
import SectionCore from './SectionCore';

export default function KeyAspects({ data, flow, setter }) {
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
