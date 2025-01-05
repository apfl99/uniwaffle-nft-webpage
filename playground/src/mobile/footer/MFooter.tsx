import * as React from 'react';
import '../MApp.css'

export const MFooter: React.FC = () => {

  return (  
    <footer className="footer">
      <div className="footer-content">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7f08fbc5b5f70f2935cba76d73d144cda775136d4bb01995ea4981db18c6a26?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8" className="footer-logo" alt="Footer Logo" />
        <div className="footer-info">
          <div className="company-details">
            <div className="company-name">(주)엘티씨웨어</div>
            <div><span className="bold-text">전화 </span><span className="normal-text">02-2220-4016</span></div>
            <div><span className="bold-text">이메일 </span><span className="normal-text">uniwaffle@uniwaffle.com</span></div>
            <div className="company-address">
              <span className="bold-text">주소 </span><span className="normal-text">서울특별시 성동구 왕십리로 222 한양대학교 IT/BT관 819호</span>
            </div>
          </div>
          <div className="copyright">Copyright © LTCware, Inc. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default MFooter;