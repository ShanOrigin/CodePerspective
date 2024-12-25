import { Route, Routes } from 'react-router-dom';

import Controller from './Controller';

export default function MainNavigation() {
  return (
    <>
      <Routes>
        <Route path="programming/*" element={<Controller />} />
      </Routes>
    </>
  );
}
