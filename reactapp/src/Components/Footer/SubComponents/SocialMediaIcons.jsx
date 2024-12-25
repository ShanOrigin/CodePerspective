export default function SocialMediaIcons() {
  const Data = [
    { iconClass: 'fa-solid fa-envelope', link: 'https://www.google.com' },
    { iconClass: 'fa-brands fa-linkedin-in', link: 'https://www.linkedin.com' },
    { iconClass: 'fa-brands fa-facebook-f', link: 'https://www.facebook.com' },
    { iconClass: 'fa-brands fa-twitter', link: 'https://www.twitter.com' }
  ];

  return (
    <>
      {Data.map((icon, ind) => (
        <a href={icon.link} key={ind} target="_blank" rel="noopener noreferrer">
          <i className={`${icon.iconClass} Social-media-icons`}></i>
        </a>
      ))}
    </>
  );
}
