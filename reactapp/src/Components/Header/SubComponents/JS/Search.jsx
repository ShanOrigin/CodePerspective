import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../CSS/Search.css';

function filterData(filteringData, parameter) {
  const result = [];

  for (const [mainKey, subObject] of Object.entries(filteringData).splice(1)) {
    const temp = [];
    for (const [key, value] of Object.entries(subObject)) {
      if (value.toLowerCase().includes(parameter.toLowerCase())) {
        temp.push(value);
      }
    }
    if (temp.length > 0) {
      result.push([mainKey, temp]);
    }
  }

  return result;
}

function getRandomColor(query) {
  const r = Math.floor(Math.random() * 200) + 30; // Random value between 30 and 230
  const g = Math.floor(Math.random() * 200) + 30; // Random value between 30 and 230
  const b = Math.floor(Math.random() * 200) + 30; // Random value between 30 and 230
  return `rgba(${r}, ${g}, ${b}, 0.9)`;
}

export default function FilteredSearch(props) {
  const [query, setQuery] = useState('');

  const filteredResults = filterData(props.Data, query);

  useEffect(() => {
    console.log('rendering child component');
  });

  const iconColor = getRandomColor(query);

  return (
    <>
      <div className="search-container">
        <i
          style={{ color: iconColor }}
          className="fa-solid fa-magnifying-glass"
        ></i>
        <input
          type="text"
          value={query}
          placeholder="Search,.."
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {query.length > 0 && (
        <>
          <div className="filter-search">
            {filteredResults.length > 0 ? (
              filteredResults.map(([mainKey, values], index) => (
                <div key={index} className="filtered-box">
                  <h4>{mainKey}</h4>
                  <ul>
                    {values.map((value, idx) => (
                      <li key={idx}>
                        <NavLink
                          className="links filter-links"
                          onClick={(e) => {
                            setQuery('');
                          }}
                          to={`programming/${props.Data.Path[mainKey]?.path ? props.Data.Path[mainKey].path + '/' : ''}${mainKey.toLowerCase().replace(/\s+/g, '-')}/${value.toLowerCase().replace(/\s+/g, '-')}&${props.Data.Path[mainKey]?.page}`}
                        >
                          {value.split('').map((v, i) => (
                            <span
                              className={
                                query.toLowerCase().includes(v.toLowerCase())
                                  ? 'filter-char'
                                  : ''
                              }
                              key={i}
                            >
                              {v}
                            </span>
                          ))}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p>No results found for "{props.query}"</p>
            )}{' '}
          </div>
        </>
      )}
    </>
  );
}

//                           to={`/programming/${props.Data.Path[mainKey]}/${mainKey.toLowerCase().replace(/\s+/g, '-')}/${value
//                             .toLowerCase()
//                             .replace(/\s+/g, '-')}`}
