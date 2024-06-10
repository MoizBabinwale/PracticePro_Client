import { useMediaQuery } from "@mui/material";
import react from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../components/Styles/footer.css";
import Practice from "../assets/Practice.png";

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
    <footer className="bg-[#4a98f7] text-white p-6 mt-6">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between">
          <div className="w-full sm:w-1/5 mb-6 sm:mb-0">
            <div className="flex items-center cursor-pointer" style={{ padding: "10px 70px" }} onClick={() => nav("/")}>
              <img src={Practice} alt="main_logo" className="" style={{ height: "200px", maxWidth: "fit-content" }} />
            </div>
          </div>

          <div className="w-full sm:w-2/3 flex flex-wrap">
            <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
              <h2 className="text-2xl mb-2">About</h2>
              <ul>
                <li>
                  <Link to="/about-us" className="block mb-2">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/career" className="block mb-2">
                    Career
                  </Link>
                </li>
                <li>
                  <Link to="/store-finder" className="block mb-2">
                    Locations
                  </Link>
                </li>
              </ul>
            </div>

            <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
              <h2 className="text-2xl mb-2">Policy</h2>
              <ul>
                <li>
                  <Link to="/terms-condition" className="block mb-2">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link to="/terms-condition#order-cancellation" className="block mb-2">
                    Cancellation
                  </Link>
                </li>
                <li>
                  <Link to="/terms-condition#return-exchange" className="block mb-2">
                    Exchange
                  </Link>
                </li>
                <li>
                  <Link to="/terms-condition#disclaimer" className="block mb-2">
                    Disclaimer
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="block mb-2">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/FAQ" className="block mb-2">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="w-full sm:w-1/3">
              <h2 className="text-2xl mb-2">Help</h2>
              <ul>
                <li>
                  <Link to="/customer-support" className="block mb-2">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/customer-support" className="block mb-2">
                    Customer Support
                  </Link>
                </li>
                <li>
                  <Link to="/customer-support" className="block mb-2">
                    Service Center
                  </Link>
                </li>
                <li>
                  <Link to="/store-finder" className="block mb-2">
                    Store Finder
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-2 border-t border-gray-700 pt-2 flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-2 sm:mb-0">
            <h2 className="text-xl mb-2">Mail Us</h2>
            <a href="mailto:contactus@olineoindia.com" className="text-white">
              contactus@olineoindia.com
            </a>
          </div>

          <div className="mb-2 sm:mb-0">
            <h2 className="text-xl mb-2">Customer Care</h2>
            <a href="tel:6390063900" className="text-blue-400">
              (+91) 63900 63900
            </a>
          </div>

          <div>
            <h2 className="text-xl mb-2">Contact</h2>
            <address className="not-italic">
              Address (W),
              <br />
              Mumbai – 400086
            </address>
          </div>
        </div>

        <div className="mt-2 border-t border-gray-700 pt-2 text-center">
          <p>
            © 2024 Practise Pro all rights reserved | Designed by
            <a href="https://forms.gle/sXxK2pMgB4xbio3B9" target="_blank" className="font-bold  text-white">
              {" "}
              P H Techno
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
