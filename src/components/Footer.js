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
    // <footer className="bg-[#4a98f7] text-white p-6 mt-6">
    //   <div className="container mx-auto">
    //     <div className="flex flex-wrap justify-between">
    //       <div className="w-full sm:w-1/5 mb-6 sm:mb-0">
    //         <div className="flex items-center cursor-pointer" style={{ padding: "10px 70px" }} onClick={() => nav("/")}>
    //           <img src={Practice} alt="main_logo" className="" style={{ height: "200px", maxWidth: "fit-content" }} />
    //         </div>
    //       </div>

    //       <div className="w-full sm:w-2/3 flex flex-wrap">
    //         <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
    //           <h2 className="text-2xl mb-2">About</h2>
    //           <ul>
    //             <li>
    //               <Link to="/about-us" className="block mb-2">
    //                 About Us
    //               </Link>
    //             </li>
    //             <li>
    //               <Link to="/career" className="block mb-2">
    //                 Career
    //               </Link>
    //             </li>
    //             <li>
    //               <Link to="/store-finder" className="block mb-2">
    //                 Locations
    //               </Link>
    //             </li>
    //           </ul>
    //         </div>

    //         <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
    //           <h2 className="text-2xl mb-2">Policy</h2>
    //           <ul>
    //             <li>
    //               <Link to="/terms-condition" className="block mb-2">
    //                 Terms
    //               </Link>
    //             </li>
    //             <li>
    //               <Link to="/terms-condition#order-cancellation" className="block mb-2">
    //                 Cancellation
    //               </Link>
    //             </li>
    //             <li>
    //               <Link to="/terms-condition#return-exchange" className="block mb-2">
    //                 Exchange
    //               </Link>
    //             </li>
    //             <li>
    //               <Link to="/terms-condition#disclaimer" className="block mb-2">
    //                 Disclaimer
    //               </Link>
    //             </li>
    //             <li>
    //               <Link to="/privacy-policy" className="block mb-2">
    //                 Privacy Policy
    //               </Link>
    //             </li>
    //             <li>
    //               <Link to="/FAQ" className="block mb-2">
    //                 FAQ
    //               </Link>
    //             </li>
    //           </ul>
    //         </div>

    //         <div className="w-full sm:w-1/3">
    //           <h2 className="text-2xl mb-2">Help</h2>
    //           <ul>
    //             <li>
    //               <Link to="/customer-support" className="block mb-2">
    //                 Contact
    //               </Link>
    //             </li>
    //             <li>
    //               <Link to="/customer-support" className="block mb-2">
    //                 Customer Support
    //               </Link>
    //             </li>
    //             <li>
    //               <Link to="/customer-support" className="block mb-2">
    //                 Service Center
    //               </Link>
    //             </li>
    //             <li>
    //               <Link to="/store-finder" className="block mb-2">
    //                 Store Finder
    //               </Link>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="mt-2 border-t border-gray-700 pt-2 flex flex-col sm:flex-row justify-between items-center">
    //       <div className="mb-2 sm:mb-0">
    //         <h2 className="text-xl mb-2">Mail Us</h2>
    //         <a href="mailto:contactus@olineoindia.com" className="text-white">
    //           contactus@olineoindia.com
    //         </a>
    //       </div>

    //       <div className="mb-2 sm:mb-0">
    //         <h2 className="text-xl mb-2">Customer Care</h2>
    //         <a href="tel:6390063900" className="text-blue-400">
    //           (+91) 63900 63900
    //         </a>
    //       </div>

    //       <div>
    //         <h2 className="text-xl mb-2">Contact</h2>
    //         <address className="not-italic">
    //           Address (W),
    //           <br />
    //           Mumbai – 400086
    //         </address>
    //       </div>
    //     </div>

    //     <div className="mt-2 border-t border-gray-700 pt-2 text-center">
    //       <p>
    //         © 2024 Practise Pro all rights reserved | Designed by
    //         <a href="https://forms.gle/sXxK2pMgB4xbio3B9" target="_blank" className="font-bold  text-white">
    //           {" "}
    //           P H Techno
    //         </a>
    //       </p>
    //     </div>
    //   </div>
    // </footer>

    <footer class="relative bg-[#4a98f7] pt-8 pb-6">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap text-left lg:text-left">
          <div class="w-full lg:w-6/12 px-4">
            <h4 class="text-3xl fonat-semibold text-blueGray-700">Let's keep in touch!</h4>
            <h5 class="text-lg mt-0 mb-2 text-blueGray-600">Find us on any of these platforms, we respond 1-2 business days.</h5>
            <div class="mt-6 lg:mb-0 mb-6 flex">
              <button
                class="flex  bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <FaXTwitter />
              </button>
              <button
                class="flex  bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <FaFacebook />
              </button>
              <button class="flex  bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                <FaInstagram />
              </button>
              {/* <button class="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                <i class="fab fa-github"></i>
              </button> */}
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="flex flex-wrap items-top mb-6">
              <div class="w-full lg:w-4/12 px-4 ml-auto">
                <span class="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Useful Links</span>
                <ul class="list-unstyled">
                  <li>
                    <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://www.creative-tim.com/presentation?ref=njs-profile">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://blog.creative-tim.com?ref=njs-profile">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://www.github.com/creativetimofficial?ref=njs-profile">
                      Github
                    </a>
                  </li>
                  <li>
                    <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://www.creative-tim.com/bootstrap-themes/free?ref=njs-profile">
                      Free Products
                    </a>
                  </li>
                </ul>
              </div>
              <div class="w-full lg:w-4/12 px-4">
                <span class="block uppercase text-blueGray-500 text-sm font-semibold mb-2">Other Resources</span>
                <ul class="list-unstyled">
                  <li>
                    <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://github.com/creativetimofficial/notus-js/blob/main/LICENSE.md?ref=njs-profile">
                      MIT License
                    </a>
                  </li>
                  <li>
                    <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://creative-tim.com/terms?ref=njs-profile">
                      Terms &amp; Conditions
                    </a>
                  </li>
                  <li>
                    <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://creative-tim.com/privacy?ref=njs-profile">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a class="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm" href="https://creative-tim.com/contact-us?ref=njs-profile">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr class="my-6 border-blueGray-300" />
        <div class="flex flex-wrap items-center md:justify-between justify-center">
          <div class="w-full md:w-6/12 px-4 mx-auto text-center">
            <div class="text-sm text-blueGray-500 font-semibold py-1">
              Copyright © <span id="get-current-year">2024</span>
              <span>
                Practise Pro all rights reserved | Designed by
                <a href="https://forms.gle/sXxK2pMgB4xbio3B9" target="_blank" className="font-bold  text-white">
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
