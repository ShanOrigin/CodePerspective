import { useContext } from 'react';
import { contextData } from '../Contexts/navigationDataContext';

export function useNavigationData() {
  const data = useContext(contextData);

  return data;
}
