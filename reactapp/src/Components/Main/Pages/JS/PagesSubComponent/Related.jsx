export default function Related(data) {
  <div className="realated-section">
    {Object.entries(data).map(([key, value]) => (
      <div className="rel-card">
        <div className="rel-img">
          <img src={value.image} alt={key + 'image'} />
        </div>
        <div className="rel-card-content">
          <p className="rel-card-title">{key}</p>
          <p className="rel-card-info">{`${value.info.splice(0, 10)}...`}</p>
        </div>
      </div>
    ))}
  </div>;
}
