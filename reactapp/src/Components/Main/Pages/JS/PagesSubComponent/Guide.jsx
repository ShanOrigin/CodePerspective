/*this function decide which keys of object should be in the guider of main page*/

import { useState, useMemo } from 'react';

import GuideSection from './GuideSection';
import { useUrls } from '../../../../../Hooks/useUrls';

function Guide(obj1, obj2) {
  return Object.entries(obj1).map(([key, value]) => {
    const search = key.split(' ').map((e) => e.toLowerCase());

    const inSearch = Object.keys(obj2);
    console.log('inSearch', inSearch);
    const found = inSearch.some((e) =>
      search.some((s) => {
        console.log(`${e} == ${s}`);
        return e.includes(s) && obj2[e].Flow == `${e}-normal-flow`
          ? true
          : false;
      })
    );
    if (found) {
      return key;
    }
  });
}

/*this component create tree like structure to demonstrate section in guide section in main page */

export default function Guider({ data, sectionData }) {
  const [toggleGuideBtn, setToggleGuideBtn] = useState(false);
  const urls = useUrls();
  // Memoizing Guide function to prevent unnecessary calls on each render
  const guideList = useMemo(() => {
    console.log('in memo Function ', sectionData);
    console.log(data);
    console.log(urls);
    const list = Guide(data, sectionData);
    console.log(list);
    return list;
  }, [sectionData]); // Recalculate only when sectionFlow changes
  const toggleGuide = () => {
    console.log('toggle guide');
    setToggleGuideBtn((toggleGuideBtn) => !toggleGuideBtn);

    setTimeout(() => {
      setToggleGuideBtn(false);
    }, 8000);
  };
  return (
    <>
      {' '}
      <span
        onClick={toggleGuide}
        className={`guide-toggle fa-solid fa-circle-exclamation `}
      ></span>
      <div
        className={`side-bar  ${
          toggleGuideBtn ? 'open-guide' : 'close-guide'
        } `}
      >
        <h2>Guide</h2>
        <aside className="Tree">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="guide-section">
              <section className="branch">
                <span className="leaves"></span>
                <h4>
                  <a href={`#${key}`}>{key} </a>
                </h4>{' '}
              </section>

              {guideList.includes(key) && GuideSection(key, value)}
            </div>
          ))}
        </aside>
      </div>
    </>
  );
}
