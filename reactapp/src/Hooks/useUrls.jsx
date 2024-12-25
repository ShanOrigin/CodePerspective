import { useContext } from 'react';
import { urlsContext } from '../Contexts/navigationDataContext';
// Custom hook to access the context
export const useUrls = () => {
  return useContext(urlsContext);
};
