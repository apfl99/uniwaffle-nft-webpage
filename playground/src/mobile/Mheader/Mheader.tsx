import * as React from 'react';
import '../MApp.css'

export const Mheader: React.FC = () => {

  return (
    <>
        <section className="hero-section">
            <div className="event-badge">유니와플 베타 테스트 기념 특별 이벤트</div>
            <h1 className="event-title">
                NFT 안에<br />숨겨진 USHD를 찾아라!
            </h1>
            <p className="event-description">
                USHD는 엘티씨웨어에서 향후 발행할 크립토입니다. NFT 소지자에게는 유니와플 서포터즈 자격을 부여하며,<br />또한 향후 엘티씨웨어에서 진행할 Token Generation Event에 참여 혜택을 제공합니다.
            </p>
            <div className="event-date">2025.01.10~01.31</div>
        </section>
        <div className="image-gallery">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/236186c8ed686079421d38ebe4a30a566d8efe41fde3a99f9002f2b6d283e3d1?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8" className="gallery-image-1" alt="NFT Artwork Display 1" />
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/395f9f52d8fa843f2caf6848633486e70c0b5d5e3988b31323fc07985c6f88b2?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8" className="gallery-image-2" alt="NFT Artwork Display 2" />
        </div>
    </>
  );
};

export default Mheader;