import * as React from 'react';
import '../MApp.css'

export const Mheader: React.FC = () => {

  return (
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
  );
};

export default Mheader;