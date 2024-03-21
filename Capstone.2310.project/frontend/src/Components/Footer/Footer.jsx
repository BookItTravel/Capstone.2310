import { useEffect } from "react";
import "./footer.css";
// import { FiSend } from 'react-icons/fi'
import { MdOutlineTravelExplore } from "react-icons/md";
// import { AiOutlineTwitter } from 'react-icons/ai'
// import { AiFillYoutube } from 'react-icons/ai'
// import { AiFillInstagram } from 'react-icons/ai'
// import { FaTripadvisor } from 'react-icons/fa'
// import { FiChevronRight } from 'react-icons/fi'
// import video from '../../assets/video2.mp4'
import Aos from "aos";
import "aos/dist/aos.css";

function Footer() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <section className="footer">
      <div className="videoDiv"></div>

      <div className="secContent container">
        <div className="footerCard flex">
          <div className="footerIntro flex">
            <div className="logoDiv">
              <a href="#" className="logo flex">
                <MdOutlineTravelExplore className="icon" />
                Book It.
              </a>
            </div>

            <div data-aos="fade-up" className="footerParagraph">
              <p>
                Inspiring journeys await with our travel application, your
                trusted companion for seamless exploration. Start your next
                adventure today and unlock a world of wonders at your
                fingertips.
              </p>
            </div>
          </div>

          <div className="footerDiv">
            <small>BEST TRAVEL WEBSITE THEME COPYRIGHTS RESERVED</small>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
