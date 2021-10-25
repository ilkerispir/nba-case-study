import React from 'react';

import { BackTop } from 'antd';

function AppFooter() {
  return (
    <div className="container-fluid">
      <div className="footer">
        <ul className="socials">
          <li className="facebook"><a href="https://www.facebook.com/useinsider/" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
          <li className="twitter"><a href="https://twitter.com/useinsider" target="_blank"><i className="fab fa-twitter"></i></a></li>
          <li className="instagram"><a href="https://www.instagram.com/useinsider" target="_blank"><i className="fab fa-instagram"></i></a></li>
          <li className="linkedin"><a href="https://www.linkedin.com/company/useinsider/" target="_blank"><i className="fab fa-linkedin-in"></i></a></li>
          <li className="youtube"><a href="https://www.youtube.com/channel/UCcgGz3WbfGqQIsIx3_DJVJA" target="_blank"><i className="fab fa-youtube"></i></a></li>
        </ul>
        <div className="copyright">Copyright &copy; 2021 Insider</div>
        <BackTop>
          <div className="goTop"><i className="fas fa-arrow-circle-up"></i></div>
        </BackTop>
      </div>
    </div>
  );
}

export default AppFooter;