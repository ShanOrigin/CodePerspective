import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import LogIn from './Pages/LogIn';

function HeadNavigation() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/LogIn" element={<LogIn />} />
    </Routes>
  );
}

export default HeadNavigation;
