import { useEffect } from "react";
import "./footer.css";
import Aos from "aos";
import "aos/dist/aos.css";
import Logo from "../../assets/BookItLogo.png"

function Footer() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="footer">
      <div className="footer-card">
        <div className="footer-top">
          <a href="/" className="logo-link">
            <img src={Logo} className="footer-icon"/>
          </a>
          <p className="footer-text">Inspiring journeys await with our travel application, your    trusted companion for seamless exploration. Start your next adventure today and unlock a world of wonders at your fingertips.</p>
        </div>
        <div className="footer-bottom">
          <a href="/" className="logo-link">
            <img src={Logo} className="footer-icon"/>
          </a>
          <small className="footer-copyright">BEST TRAVEL WEBSITE THEME COPYRIGHTS RESERVED</small>
        </div>
      </div>
    </div>

  );
}

export default Footer;
