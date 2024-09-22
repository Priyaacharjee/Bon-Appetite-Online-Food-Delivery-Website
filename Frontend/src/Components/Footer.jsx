import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { MdEmail } from "react-icons/md";
import { FaFacebook, FaPhoneAlt, FaInstagramSquare } from "react-icons/fa";

const Footer = ({ phone, email, fbLink, instaLink }) => {
  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        className="bg-body-tertiary footer"
      >
        <div className="col-12" style={{ display: "flex" }}>
          {/*Contact Div */}
          <div className="col-6" style={{ color: "white" }}>
            <h4>Contact</h4>
            <div style={{ paddingTop: "40px", marginLeft: "-23px" }}>
              <FaPhoneAlt className="icon" /> :{" "}
              <span className="link">{phone}</span>
            </div>
            <div style={{ paddingTop: "10px", marginLeft: "-23px" }}>
              <MdEmail className="icon" /> :{" "}
              <span className="link">{email}</span>
            </div>
            <div style={{ paddingTop: "10px", marginLeft: "-23px" }}>
              <a href={fbLink} target="new">
                <FaFacebook className="icon" />
              </a>
              <a href={instaLink} target="new">
                <FaInstagramSquare className="icon" />
              </a>
            </div>
          </div>

          {/*About Div */}
          <div className="col-6">
            <h4>About</h4>
          </div>
        </div>
      </Navbar>
      <Navbar bg="dark" variant="dark" expand="lg" className="m-0 p-0">
        <div className="footer">
          <div className="foot_panel4">
            <div className="copyright">
              &copy;Prepared on 2023-24, Bon Appetite
            </div>
            <div style={{fontSize:'20px',paddingTop:'1rem'}}>Developed By</div>
            <div><strong>Keya Tarafdar</strong></div>
            <div><strong>Priya Acharjee</strong></div>
            <div><strong>Shreya Kundu</strong></div>
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default Footer;
