import './Footer.css';
import FootLinks from './SubComponents/FootLinks';
import SocialMediaIcons from './SubComponents/SocialMediaIcons';

export default function Footer(props) {
  return (
    <>
      <footer className="footer-container">
        <div className="address-box">
          <div>
            <span className="address-title">Contact : </span> 9069990303
          </div>

          <div>
            <span className="address-title"> Email : </span>
            gv2422244242@gmail.com
          </div>

          <div>
            <span className="address-title">Address : </span> Pimpari Chinchawad
            , Pune
          </div>
        </div>

        <div className="services">
          <ul>
            <FootLinks />
          </ul>
        </div>
        <div className="social-media">
          <SocialMediaIcons />
        </div>
        <div className="copy-right">
          C-Perspective.com All Rights Are Reserved @Copyright
        </div>
      </footer>
    </>
  );
}
