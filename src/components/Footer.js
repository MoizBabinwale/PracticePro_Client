import { useMediaQuery } from "@mui/material";
import react from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../components/Styles/footer.css";

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
    <>
      <footer className="footerContainer">
        <div className="footer_company_detail">
          <div className="footer_logo" onClick={() => nav("/")}>
            {/* <img src={footerLogo} alt="main_logo" /> */}
          </div>
        </div>
        <div className="footer-items">
          <div className="footer_last ">
            <div className="about-container">
              <span className="about-heading heading-2xl">About</span>
              <div className="about">
                <Link to="/about-us" className="about-item">
                  Abount Us
                </Link>
                <Link to="/career" className="about-item">
                  Carrer
                </Link>
                <Link to="/store-finder" className="about-item">
                  Locations
                </Link>
              </div>
            </div>
            <div className="policy-container">
              <span className="policy-heading heading-2xl">policy</span>
              <div className="policy">
                <Link to="/terms-condition" className="policy-item">
                  Terms
                </Link>
                <Link to="/terms-condition#order-cancellation" className="policy-item">
                  <span>Canncelation</span>
                </Link>
                <Link to="/terms-condition#return-exchange" className="policy-item">
                  Exchange
                </Link>
                <Link to="/terms-condition#disclaimer" className="policy-item">
                  Disclaimer
                </Link>
                {/* <span className="policy-item">{t('EMIPlans')}</span> */}
                {/* <span className="policy-item">{t('ERPPolicy')}</span> */}
                <Link to="/privacy-policy" className="policy-item">
                  privacyPolicy
                </Link>
                <Link to="/FAQ" className="policy-item">
                  FAQ
                </Link>
              </div>
            </div>
            <div className="help-container">
              <span className="help-heading heading-2xl">Help</span>
              <div className="help">
                <Link to="/customer-support" className="help-item">
                  contact
                </Link>
                <Link to="/customer-support" className="help-item">
                  Customer Support
                </Link>
                <Link to="/customer-support" className="help-item">
                  Servicecenter
                </Link>
                <Link to="/store-finder" className="help-item">
                  o
                </Link>
                {/* <Link to="/customer-support" className="help-item">
                            {t("BecomeASupplier")}
                          </Link> */}
              </div>
            </div>
            <div className="payment-container">
              {/* <div className="payment-method">
                          <div className="payment-heading heading-2xl">{t("Payment")}</div>
                          <div className="payment-cards d-flex">
                            <img className="pay-image" style={{}} src={paypal} alt="img1" />
                            <img className="pay-image" src={RuPay} alt="img2" />
                            <img className="pay-image" src={Visa_Logo} alt="img3" />
                            <img className="pay-image" src={Mastercard} alt="img4" />
                            <img className="pay-image" src={visaElectron} alt="img4" />
                          </div>
                        </div> */}
              <div className="payment-heading heading-2xl">Connect</div>
              {/* <div className="social_links_wrapper">
                {socialIcon.map((data, index) => (
                  <a href={data.link} target="_blank" rel="noreferrer" key={`social_Icons_${index}`}>
                    <img className="socialMedia-icon" key={index} src={data.icon} alt={`footer_${index}`} style={{ marginBottom: "5px" }} />
                  </a>
                ))}
              </div> */}
            </div>

            <div className="footer_terms_container d-block d-md-none">
              <p className="footer_last_heading">footer.useful-links</p>
              <div className="footer_terms_wrapper">
                <div className="footer_terms_column1">
                  <Link to={"/wishlist"}>
                    <p className="footer_terms">wishlist</p>
                  </Link>
                </div>
                <div className="footer_terms_column2">
                  <Link to={"/customer-support"}>
                    <p className="footer_terms">cust-service</p>
                  </Link>
                  <Link to={"/customer-support"}>
                    <p className="footer_terms"> terms</p>
                  </Link>
                  <Link to={"/customer-support"}>
                    <p className="footer_terms"> privacy</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="vertical-div tx-white "></div>
          <div className="new-con ">
            <div className="mail-us tx-white">
              <span className=" heading-2xl">MailUs</span>
              <span id="mail-neg-margin">
                <a target="_blank" rel="noreferrer" href="mailto:contactus@olineoindia.com">
                  contactus@olineoindia.com
                </a>
              </span>
            </div>
            <div className="customer-care tx-white">
              <span className="heading-2xl">CustomerCare</span>
              <span id="mail-neg-margin">
                <a href="tel:63900 63900" target="_blank" rel="noreferrer">
                  (+91) 63900 63900
                </a>{" "}
              </span>
            </div>
          </div>
          <div className="last_contact_details" id="last_contact_details-sm-q">
            <span className="footer_last_heading d-block d-md-none"> contact</span>
            <span className="heading-2xl footer_last_heading_desk  "> contact</span>
            <div className="contact_link_container">
              <span className="contact-address">
                address (W),
                <br /> Mumbai – 400086
              </span>
            </div>
          </div>
        </div>
        <div className="footer_copyright">
          {/* <img src={copyrightWhite} alt="" /> */}
          <p id="copy-right">
            {" "}
            © 2024 Practice Pro all right reserved | Designed by 
            <span className="font-bold">
              <a href="https://forms.gle/sXxK2pMgB4xbio3B9" target="_blank">
                P H Techno
              </a>
            </span>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
