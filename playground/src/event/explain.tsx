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
            <div id="step-description">'지갑 연결하기' 버튼을 클릭해주세요.</div>
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
            <div id="step-description">창이 표시되면 'WalletConnect' 버튼을 클릭해주세요.</div>
          </div>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/4caad8969094fd2c3a69dbd4aaef29f668a9091796cacc39425e1b3c232c01fc?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8" id="wallet-screenshot" alt="WalletConnect 버튼 위치 스크린샷" />
        </div>
        <div id="arrow-separator">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4db170f423df406e30685fb5556e4bdb116c1ce0348aa6e1f17a5035c7eef0b?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8" id="arrow-icon" alt="" />
        </div>
        <div id="step-wrapper">
          <div id="step-content">
            <div id="step-indicator">Step 3</div>
            <div id="step-description">'Trust Wallet'을 선택해주세요.</div>
          </div>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/4736354592a45aae614af75257d3c48d063b563bb4908c1347361a1b0d8d0e25?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8" id="trust-wallet-screenshot" alt="Trust Wallet 선택 화면 스크린샷" />
        </div>
        <div id="arrow-separator">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4db170f423df406e30685fb5556e4bdb116c1ce0348aa6e1f17a5035c7eef0b?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8" id="arrow-icon" alt="" />
        </div>
        <div id="step-wrapper">
          <div id="step-content">
            <div id="step-indicator">Step 4</div>
            <div id="step-description">유니와플 앱을 열어서 아래의 QR 코드를 인식하거나 링크를 복사하여 수동으로 코드를 입력하세요.</div>
            <div id="step-subtitle">[유니와플 앱 &gt;  크립토 메인 &gt; 바로가기 메뉴 'WalletConnect']</div>
          </div>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d8d695fd5fc618389f160667ed846cdc886739bb047000afd7265d850f6890a7?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8" id="qr-screenshot" alt="WalletConnect QR 코드 스크린샷" />
        </div>
      </div>
    </div>
    );
};

export default Explain;