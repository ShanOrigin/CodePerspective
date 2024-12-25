// Component to create Concept section in Main page

export default function Concept({ data }) {
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
