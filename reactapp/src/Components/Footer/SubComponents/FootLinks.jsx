import React from 'react'
import { NavLink } from 'react-router-dom'

const NAV_LINKS = [
  { ref: '/about-us', page: 'About Us' },
  { ref: '/contact-us', page: 'Contact Us' },
  { ref: '/suggestions', page: 'Suggestions' },
  { ref: '/feedback', page: 'FeedBack' },
  { ref: '/copyright', page: 'CopyRight' },
]

export default function FootLinks({ linkItemClass }) {
  return (
    <>
      {NAV_LINKS.map((item) => (
        <li key={item.ref} className={linkItemClass}>
          <NavLink to={item.ref}>{item.page}</NavLink>
        </li>
      ))}
    </>
  )
}
