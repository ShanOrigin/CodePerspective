// Full Accordion Component Code
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../CSS/Accordian.css';
import { useNavigationData } from '../../../../Hooks/useNavigationData';

const Accordion = ({ closeMenu }) => {
  const data = useNavigationData();
  const [openSections, setOpenSections] = useState(Object.keys(data));
  //  const urls = useUrls();
  const toggleSection = (key) => {
    setOpenSections((prevOpenSections) =>
      prevOpenSections.includes(key)
        ? prevOpenSections.filter((section) => section !== key)
        : [...prevOpenSections, key]
    );
  };
  const paths = Object.entries(data);
  paths.splice(0, 1);

  return (
    <div className="accordion-container">
      {paths.map(([key, value]) => (
        <div key={key} className="accordion-item">
          <div className="accordion-title">
            <NavLink
              to={`/programming/${data.Path[key]}/${key.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={closeMenu}
            >
              {key}{' '}
            </NavLink>

            <span
              onClick={() => toggleSection(key)}
              className={`arrow fa-solid fa-angle-down ${openSections.includes(key) ? 'open' : ''}`}
            ></span>
          </div>

          <div
            className={`accordion-content ${openSections.includes(key) ? 'show' : ''}`}
          >
            {Object.entries(value).map(([innerKey, innerValue]) => (
              <div key={innerKey} className="content-item">
                <NavLink
                  className="links accordian-links"
                  to={`programming/${data.Path[key]?.path ? data.Path[key].path + '/' : ''}${key.toLowerCase().replace(/\s+/g, '-')}/${innerValue.toLowerCase().replace(/\s+/g, '-')}&${data.Path[key]?.page || ''}`}
                  onClick={closeMenu}
                >
                  <strong>{innerValue}</strong>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;

// {`/programming/${data.Path[key]}/${key.toLowerCase().replace(/\s+/g, '-')}/${innerValue
//                     .toLowerCase()
//                     .replace(/\s+/g, '-')}`}
