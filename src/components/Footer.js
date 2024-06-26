import { useMediaQuery } from "@mui/material";
import react from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../components/Styles/footer.css";
import Practice from "../assets/Practice.png";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
const Footer = () => {
  const nav = useNavigate();
  //   const socialIcon = [
  //     { icon: twitterIcon, link: "https://twitter.com/olineoindia" },
  //     { icon: facebookIcon, link: "https://www.facebook.com/OLineOIndia/" },
  //     { icon: instagramIcon, link: "https://www.instagram.com/olineoindia/" },
  //     { icon: linkedinIcon, link: "https://www.linkedin.com/company/olineoindia" },
  //     { icon: youtubeIcon, link: "https://www.youtube.com/@OLineOIndia" },
  //   ];

  const isMobile = useMediaQuery("(max-width: 500px)");
  const loc = useLocation();

  return (
    <footer className="relative bg-[#4a98f7] pt-8 pb-6 mt-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl fonat-semibold text-blueGray-700">Let's keep in touch!</h4>
            <h5 className="text-lg mt-0 mb-2 text-blueGray-600">Find us on any of these platforms, we respond 1-2 business days.</h5>
            <p>
              <b>Contact Number</b>
            </p>
            <p>+91 8793021099</p>
            {/* <div className="mt-6 lg:mb-0 mb-6 flex">
              <button
                className="flex  bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <FaXTwitter />
              </button>
              <button
                className="flex  bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <FaFacebook />
              </button>
              <button className="flex  bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                <FaInstagram />
              </button>
              <button className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                <i className="fab fa-github"></i>
              </button>
            </div> */}
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                {/* <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Useful Links</span> */}
                <ul className="list-unstyled">
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                      <Link to="/aboutUs"> About Us</Link>
                    </a>
                  </li>
                  {/* <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                      <Link to="/termsCondition"> Terms &amp; Conditions</Link>
                    </a>
                  </li> */}
                  <li>
                    <a className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm">
                      <Link to="/privacyPolicy">Privacy Policy</Link>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-6/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 font-semibold py-1">
              Copyright © <span id="get-current-year">2024</span>
              <span>
                Practise Pro all rights reserved | Designed by
                <a href="https://forms.gle/sXxK2pMgB4xbio3B9" target="_blank" className="font-bold  text-white">
                  {" "}
                  P H Techno
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
