import { NavLink } from 'react-router-dom';

export default function FootLinks(props) {
  const Data = [
    { ref: '/about-us', page: 'About Us' },
    { ref: '/contact-us', page: 'Contact Us' },
    { ref: '/services', page: 'Services' },
    { ref: '/suggestions', page: 'Suggestions' },
    { ref: '/feedback', page: 'FeedBack' },
    { ref: '/copyright', page: 'CopyRight' }
  ];

  return (
    <>
      {Data.map((pages) => (
        <li className="services-links">
          <NavLink exact to={pages.ref}>
            {pages.page}
          </NavLink>
        </li>
      ))}
    </>
  );
}

/*
 import { NavLink } from 'react-router-dom';

export default function Navigation() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav>
      <NavLink
        onClick={() => scrollToSection('target-section-id')}
        className="nav-link"
      >
        Scroll to Section
      </NavLink>
    </nav>
  );
}

*/
