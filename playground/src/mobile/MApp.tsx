import * as React from 'react';
import MFooter from './footer/MFooter';
import Mheader from './Mheader/Mheader';
import './MApp.css'

export const MApp: React.FC = () => {

  return (
    <div className="event-container">
      <div className="event-wrapper">
            <Mheader />
            <div className="image-gallery">
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/236186c8ed686079421d38ebe4a30a566d8efe41fde3a99f9002f2b6d283e3d1?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8" className="gallery-image-1" alt="NFT Artwork Display 1" />
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/395f9f52d8fa843f2caf6848633486e70c0b5d5e3988b31323fc07985c6f88b2?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8" className="gallery-image-2" alt="NFT Artwork Display 2" />
            </div>
            <section className="form-section">
            <form className="form-wrapper">
                <p className="form-title">유니와플 가입 계정의 이메일을 입력하고, NFT에 숨겨진 USHD 토큰의 수량을 확인해보세요!</p>
                <div className="input-group">
                {/* <label for="email" className="visually-hidden">이메일을 입력하세요</label> */}
                <input type="email" id="email" className="input-wrapper" placeholder="이메일을 입력하세요" required aria-label="이메일 입력" />
                </div>
                <button type="submit" className="submit-button">USHD 수량 확인하기</button>
            </form>
            </section>
            <MFooter />
      </div>
    </div>
  );
};

export default MApp;