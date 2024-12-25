/*this section core fun component is responsible for providing core section of each sections in the main page sections are the case of switch statements*/

export default function SectionCore({ which, data }) {
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
