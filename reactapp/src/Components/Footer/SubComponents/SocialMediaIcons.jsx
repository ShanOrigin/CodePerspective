import React from "react";
import {
  FaEnvelope,
  FaLinkedinIn,
  FaFacebookF,
  FaTwitter,
  FaGit,
  FaGithub,
} from "react-icons/fa";
import AnimatedIcon from "../../common/AnimatedIcon";

const SOCIAL_CHANNELS = [
  {
    id: "Email",
    label: "Send Email",
    title: "Email: codeperspective3.14@gmail.com",
    link: "mailto:codeperspective3.14@gmail.com",
    icon: <FaEnvelope />,
    isExternal: false,
  },
  {
    id: "LinkedIn",
    label: "LinkedIn",
    title: "LinkedIn",
    link: "https://linkedin.com/in/shanorigin",
    icon: <FaLinkedinIn />,
    isExternal: true,
  },
  {
    id: "Git",
    label: "git",
    title: "git",
    link: "https://github.com/ShanOrigin/CodePerspective",
    icon: <FaGithub />,
    isExternal: true,
  },

];

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
          target={item.isExternal ? "_blank" : undefined}
          rel={item.isExternal ? "noopener noreferrer" : undefined}
        >
          <AnimatedIcon size="sm" variant="inset">
            {item.icon}
          </AnimatedIcon>
        </a>
      ))}
    </>
  );
}
