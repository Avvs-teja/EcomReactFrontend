import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

function ContactUs() {
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <div className="container py-5">
        <h1 className="mb-4 text-center">Contact Us</h1>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-body">
                <form>
                  <div className="mb-3 row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" id="name" placeholder="Your Name" />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                      <input type="email" className="form-control" id="email" placeholder="Your Email Address" />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label htmlFor="message" className="col-sm-2 col-form-label">Message</label>
                    <div className="col-sm-10">
                      <textarea className="form-control" id="message" rows="4" placeholder="Your Message Here"></textarea>
                    </div>
                  </div>
                  <div className="text-end">
                    <button type="submit" className="btn btn-primary">Send Message</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card" style={{ minHeight: "50vh" }}>
              <div className="card-body">
                <h5 className="card-title">Contact Information</h5>
                <p className="card-text">
                  <FaMapMarkerAlt /> <strong>Address:</strong> <br /> 123 Apple St, Cupertino, CA 95014
                </p>
                <p className="card-text">
                  <FaPhoneAlt /> <strong>Phone:</strong> <br /> (123) 456-7890
                </p>
                <p className="card-text">
                <FaEnvelope /> <strong>Sales Support:</strong> <br />
                 <a href="mailto:sales@applestore.com">sales@applestore.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer bg-dark py-3 mt-auto">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-auto text-center text-white">
              <a href="https://www.facebook.com" className="btn btn-outline-light me-3"><FaFacebook /></a>
              <a href="https://www.twitter.com" className="btn btn-outline-light me-3"><FaTwitter /></a>
              <a href="https://www.instagram.com" className="btn btn-outline-light"><FaInstagram /></a>
            </div>
          </div>
          <div className="row justify-content-center mt-2">
            <div className="col-auto text-center text-white">
              &copy; 2024 Apple Store. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ContactUs;
