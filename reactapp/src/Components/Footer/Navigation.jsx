import { Route, Routes } from 'react-router-dom'
import AboutUs from './Pages/JS/AboutUs'
import ContactUs from './Pages/JS/ContactUs'
import Services from './Pages/JS/Services'
import Suggestions from './Pages/JS/Suggestions'
import Feedback from './Pages/JS/Feedback'
import Copyright from './Pages/JS/Copyright'

export default function FooterNavigation(props) {
  const Data = [
    { ref: '/about-us', page: <AboutUs /> },
    { ref: '/contact-us', page: <ContactUs /> },
    { ref: '/services', page: <Services /> },
    { ref: '/suggestions', page: <Suggestions /> },
    { ref: '/feedback', page: <Feedback /> },
    { ref: '/copyright', page: <Copyright /> },
  ]

  return (
    <Routes>
      {Data.map((pages, ind) => (
        <Route key={ind} path={pages.ref} element={pages.page} />
      ))}
    </Routes>
  )
}
