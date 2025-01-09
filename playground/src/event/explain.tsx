import React from 'react';

const Explain: React.FC = () => {
    return (
      <div id="wallet-guide">
      <div id="header-section">
        <div id="header-container">
          <div id="header-title-wrapper">
            <div id="header-title">WalletConnect 연결 방법</div>
          </div>
        </div>
      </div>
      <div id="steps-container">
        <div id="step-wrapper">
          <div id="step-content">
            <div id="step-indicator">Step 1</div>
            <div id="step-description">'Select Wallet' 버튼을 클릭해주세요.</div>
          </div>
        </div>
        <div id="arrow-separator">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c777242aa909b80c7c689917b92fb9c4ab537a89c973c434f49bcf0f09a83699?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8" id="arrow-icon" alt="" />
          <br />
          <br />
        </div>
        <div id="step-wrapper">
          <div id="step-content">
            <div id="step-indicator">Step 2</div>
            <div id="step-description">창이 표시되면 'Uniwaffle' 버튼을 클릭해주세요.</div>
          </div>
          <img loading="lazy" src="https://cdn.discordapp.com/attachments/1326744308350718045/1326780591001047050/step2-img.png?ex=6780ac37&is=677f5ab7&hm=47cc8f1547e7e83608d1a4cd40a1482ac05cab8a9f127f50adbd47f541abcaea&" id="wallet-screenshot" alt="WalletConnect 버튼 위치 스크린샷" />
        </div>
        <div id="arrow-separator">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4db170f423df406e30685fb5556e4bdb116c1ce0348aa6e1f17a5035c7eef0b?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8" id="arrow-icon" alt="" />
        </div>
        <div id="step-wrapper">
          <div id="step-content">
            <div id="step-indicator">Step 3</div>
            <div id="step-description">유니와플 앱을 열어서 아래의 QR 코드를 인식하거나 링크를 복사하여 수동으로 코드를 입력하세요.</div>
            <div id="step-subtitle">[유니와플 앱 &gt;  크립토 메인 &gt; 바로가기 메뉴 'WalletConnect']</div>
          </div>
          <img loading="lazy" src="https://cdn.discordapp.com/attachments/1326744308350718045/1326780591378792500/step3-img.png?ex=6780ac37&is=677f5ab7&hm=94a0a1286f6ca1e0b514b4bc0a8f1bcd981890a81da909d0075d38bb3ab08f63&" id="qr-screenshot" alt="WalletConnect QR 코드 스크린샷" />
        </div>
      </div>
    </div>
    );
};

export default Explain;