// import { createContext } from 'react';
// import { useNavigationData } from '../Hooks/useNavigationData';

// function UrlsData() {
//   const advanceData = useNavigationData();

//   const urls = Object.entries(advanceData)
//     .slice(1)
//     .map(([type, object]) => {
//       return Object.entries(object).map(([key, value]) => {
//         return `programming/${advanceData.Path[type]?.path ? advanceData.Path[type].path + '/' : ''}${type.toLowerCase().replace(/\s+/g, '-')}/${value.toLowerCase().replace(/\s+/g, '-')}?-${advanceData.Path[type]?.page}`;
//       });
//     });

//   return urls;
// }

// const urlsContext = createContext(UrlsData());

// export const urlsDataProvider = ({ children }) => {
//   return <urlsContext.Provider>{children}</urlsContext.Provider>;
// };

// import { createContext } from 'react';
// import { useNavigationData } from '../Hooks/useNavigationData';

// function UrlsData() {
//   const advanceData = useNavigationData();

//   const urls = Object.entries(advanceData)
//     .slice(1) // Using slice instead of splice to avoid modifying the original array
//     .map(([type, object]) => {
//       return Object.entries(object).map(([key, value]) => {
//         return `programming/${advanceData.Path[type]?.path ? advanceData.Path[type].path + '      /' : ''}${type.toLowerCase().replace(/\s+/g, '-')}/${value.toLowerCase().replace(/\s+/g, '-')}?-${advanceData.Path[type]?.page}`;
//       });
//     });

//   return urls;
// }

// const urls = UrlsData();
// export const urlsContext = createContext(urls);

// export const UrlsDataProvider = ({ children }) => {
//   return <urlsContext.Provider>{children}</urlsContext.Provider>;
// };

import { createContext } from 'react';
import { useNavigationData } from '../Hooks/useNavigationData';

function UrlsData() {
  const advanceData = useNavigationData(); // Using the hook inside a function component
  console.log('object', advanceData);
  const urls = Object.entries(advanceData)
    .slice(1) // Using slice instead of splice to avoid modifying the original array
    .map(([type, object]) => {
      return Object.entries(object).map(([key, value]) => {
        return `programming/${advanceData.Path[type]?.path ? advanceData.Path[type].path + '      /' : ''}${type.toLowerCase().replace(/\s+/g, '-')}/${value.toLowerCase().replace(/\s+/g, '-')}?-${advanceData.Path[type]?.page}`;
      });
    });

  return urls;
}

// Create context without calling the hook outside of a component
export const urlsContext = createContext(null);

export const UrlsDataProvider = ({ children }) => {
  const urls = UrlsData(); // Call the function inside a component

  return <urlsContext.Provider value={urls}>{children}</urlsContext.Provider>;
};

// const validateUrl = (urls, Curl) => {
//   // Function to remove the query part of a URL
//   const cleanUrl = (url) => {
//     return url.split('?')[0]; // Split the URL at '?' and take the first part (the base URL)
//   };

// 	const page = Curl.split("?")[1].slice(1);

//   // Clean the input URL (Curl) before comparison
//   const cleanedCurl = cleanUrl(Curl);

//   // Check if the cleaned URL exists in any of the sub-arrays
//   const valid = urls.some((element) => {
//     return element.some((url) => cleanUrl(url) === cleanedCurl);
//   });

//   if (valid) {
//     console.log('valid url', Curl);
//   } else {
//     console.log('invalid url', Curl);
//   }
// 	console.log("page type is " , page );
// };

// // Test the function with a sample URL
// const u = 'programming/data-structure/array?-typespage';
// validateUrl(urls, u);
//
//
//
 /*
import { createContext } from 'react';
import { useNavigationData } from '../Hooks/useNavigationData';
import PropTypes from 'prop-types'; // Import PropTypes for validation

function UrlsData() {
  const advanceData = useNavigationData();
  console.log('object', advanceData);

  const urls = Object.entries(advanceData)
    .slice(1) // Using slice instead of splice to avoid modifying the original array
    .map(([ , value]) => { // Ignore 'key' since it's not used
      return Object.entries(value).map(([key, value]) => {
        return `programming/${advanceData.Path[type]?.path ? advanceData.Path[type].path + '/' : ''}${type.toLowerCase().replace(/\s+/g, '-')}/${value.toLowerCase().replace(/\s+/g, '-')}?-${advanceData.Path[type]?.page}`;
      });
    });

  return urls;
}

// Create context without calling the hook outside of a component
export const urlsContext = createContext(null);

export const UrlsDataProvider = ({ children }) => {
  const urls = UrlsData(); // Call the function inside a component

  return <urlsContext.Provider value={urls}>{children}</urlsContext.Provider>;
};

UrlsDataProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate 'children' as a React node
};

*/
