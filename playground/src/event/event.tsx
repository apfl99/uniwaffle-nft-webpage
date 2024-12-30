import React from 'react';

const Event: React.FC = () => {
    return (
        <div id="event">
            <span id="event-title">유니와플 베타 테스트 기념 특별 이벤트</span>
            <span id="event-info">NFT 안에 숨겨진 USHD를 찾아라!</span>
            <span id="event-description">
                USHD는 (주)엘티씨웨어에서 발행할 토큰입니다. NFT 소지자에게는 유니와플 서포터즈 자격을 부여하며,
                <br />
                또한 향후 엘티씨웨어에서 진행할 Token Generation Event에 참여 혜택을 제공합니다.
            </span>
            <span id="event-date">2025.01.13~01.31</span>
        </div>
    );
};

export default Event;