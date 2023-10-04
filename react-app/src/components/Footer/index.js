import React from 'react';
import './Footer.css'

const Footer = () => {
  return (
    <div className="footer-wrapper footer">
      <div className="footer-container">
        <div className="content-container">
          <div className="content-info">
            <div className="info">
              <div className="name">Steven Sauseda</div>
              <ul className="link-list">
                <li className="link">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/SSauseda"
                  >
                    <i className="fab fa-github fa-2x"></i> Profile
                  </a>
                </li>
                <li className="link">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/SSauseda/endurotrak"
                  >
                    <i className="fab fa-github fa-2x"></i> Repo
                  </a>
                </li>
                <li className="link">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.linkedin.com/in/stevensauseda/"
                  >
                    <i className="fab fa-linkedin fa-2x"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
