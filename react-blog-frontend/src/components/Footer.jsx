import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>About Us</h5>
            <p>Digi Naratives are online platforms where people share their thoughts, experiences, and expertise on various topics. They often include text, images, and multimedia content to engage readers.</p>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/home" className="text-white">Home</a></li>
              <li><a href="/blogs" className="text-white">Blogs</a></li>
              <li><a href="/create" className="text-white">Create</a></li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Follow Us</h5>
            <a href="https://facebook.com" className="text-white me-2">Facebook</a>
            <a href="https://twitter.com" className="text-white me-2">Twitter</a>
            <a href="https://instagram.com" className="text-white">Instagram</a>
          </div>
        </div>
        <div className="mt-3">
          <p>© 2024 Digi Naratives. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
