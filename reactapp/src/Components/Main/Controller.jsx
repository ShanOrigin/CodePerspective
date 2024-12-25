import { useLocation } from 'react-router-dom';
import { useUrls } from '../../Hooks/useUrls';
import  React ,  { useEffect, useState } from 'react';
import TypesPage from './Pages/JS/TypesPage';
import OperationPage from './Pages/JS/OperationPage';
// Function to validate a URL
const validateUrl = (urls, Curl) => {
  const createKey = (keyData) => {
    return keyData
      .split('-') // Split by '-'
      .map((word) => word[0].toUpperCase() + word.slice(1)) // Capitalize first letter
      .join(' '); // Join words with a space
  };

  const cleanUrl = (url) => url.split('&')[0]; // Clean the base URL

  // Extract the key and page from Curl
  const urlsParts = Curl.split('/');
  const key = createKey(urlsParts[urlsParts.length - 2]); // Key from URL
  const page = Curl.split('&')[1]; // Extract page after '&'

  // Find the matching section
  const section = urls.find((element) => element[0] === key);

  if (!section) {
    console.log('Invalid section key:', key);
    return false;
  }

  // Check if the cleaned URL exists in the matched section
  const valid = section[1].some(
    (url) => '/' + cleanUrl(url) === cleanUrl(Curl)
  );

  if (valid) {
    console.log('Valid URL:', Curl);
  } else {
    console.log('Invalid URL:', Curl);
  }

  console.log('Page type is:', page);
  return valid;
};

export default function Controller() {
  const [data, setData] = useState(null);
  const url = useLocation();
  const urls = useUrls();
  const page = url.pathname.split('&')[1]; // Extract page after '&'

  useEffect(() => {
    console.log(urls);
  }, [url]);

  // featching data from backend
  //
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:1430/QueenMedusa/Arrays'
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('Fetched data:', result);

        setTimeout(() => {
          setData(result.data);
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  if (validateUrl(urls, url.pathname)) {
    switch (page) {
      case 'typespage':
        return (
          <>
            <TypesPage data={data} />
          </>
        );

      case 'operationpage':
        return (
          <>
            <OperationPage data={data} />
          </>
        );

      default:
        break;
    }
  } else {
    return (
      <>
        <p>{url.pathname}</p>
        <p>{urls}</p>
        <p>invalid url </p>
      </>
    );
  }
}
