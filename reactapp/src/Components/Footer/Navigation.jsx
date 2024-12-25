import { Route, Routes } from 'react-router-dom';
import AboutUs from './Pages/JS/AboutUs';
import ContactUs from './Pages/JS/ContactUs';
import Services from './Pages/JS/Services';
import Suggestions from './Pages/JS/Suggestions';
import FeedBack from './Pages/JS/FeedBack';
import CopyRight from './Pages/JS/CopyRight';

export default function FooterNavigation(props) {
  const Data = [
    { ref: '/about-us', page: <AboutUs /> },
    { ref: '/contact-us', page: <ContactUs /> },
    { ref: '/services', page: <Services /> },
    { ref: '/suggestions', page: <Suggestions /> },
    { ref: '/feedback', page: <FeedBack /> },
    { ref: '/copyright', page: <CopyRight /> }
  ];

  return (
    <Routes>
      {Data.map((pages, ind) => (
        <Route key={ind} path={pages.ref} element={pages.page} />
      ))}
    </Routes>
  );
}
