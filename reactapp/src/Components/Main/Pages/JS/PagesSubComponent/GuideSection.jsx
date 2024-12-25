/*this component create guide section in the guide area of main page*/

export default function GuideSection(key, value) {
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
