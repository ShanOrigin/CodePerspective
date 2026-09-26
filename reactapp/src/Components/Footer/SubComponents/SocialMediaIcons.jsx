import React from 'react'
import { FaEnvelope, FaLinkedinIn, FaFacebookF, FaTwitter } from 'react-icons/fa'
import AnimatedIcon from '../../common/AnimatedIcon'

const SOCIAL_CHANNELS = [
  {
    id: 'email',
    label: 'Send Email',
    title: 'Email: shantanusuryawanshi3.14@gmail.com',
    link: 'mailto:shantanusuryawanshi3.14@gmail.com',
    icon: <FaEnvelope />,
    isExternal: false,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    title: 'LinkedIn',
    link: 'https://www.linkedin.com',
    icon: <FaLinkedinIn />,
    isExternal: true,
  },
  {
    id: 'facebook',
    label: 'Facebook',
    title: 'Facebook',
    link: 'https://www.facebook.com',
    icon: <FaFacebookF />,
    isExternal: true,
  },
  {
    id: 'twitter',
    label: 'Twitter',
    title: 'Twitter / X',
    link: 'https://www.twitter.com',
    icon: <FaTwitter />,
    isExternal: true,
  },
]

export default function SocialMediaIcons({ buttonClass }) {
  return (
    <>
      {SOCIAL_CHANNELS.map((item) => (
        <a
          key={item.id}
          href={item.link}
          className={buttonClass}
          aria-label={item.label}
          title={item.title}
          target={item.isExternal ? '_blank' : undefined}
          rel={item.isExternal ? 'noopener noreferrer' : undefined}
        >
          <AnimatedIcon size="sm" variant="inset">
            {item.icon}
          </AnimatedIcon>
        </a>
      ))}
    </>
  )
}
