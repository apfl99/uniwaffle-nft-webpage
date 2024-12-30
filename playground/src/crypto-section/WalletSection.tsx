import React from 'react';
import App from '../App.tsx'
import '../index.css'
import { SolanaContext } from '../SolanaContext.tsx'
import Explain from '../event/explain.tsx'

const WalletSection: React.FC = () => {
    return (
        <div id="wallet-section">
            <div id="wallet-content">
                <div id="wallet-header">
                    <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/28020ae579b29da7f975e76553bfd95254febc78c4c19f23e59f396c54202e87?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8"
                    id="wallet-icon"
                    alt="Wallet connection icon"
                    />
                    <div id="wallet-message">
                    WalletConnect를 통해 지갑을 연결하여
                    <br />
                    NFT에 숨겨진 USHD 토큰의 수량을 확인해보세요!
                    </div>
                </div>
                <SolanaContext>
			        <App />
		        </SolanaContext>
                </div>
                <div id="help-section">
                <div id="help-title">연결이 잘 안되나요?</div>
                <div id="help-text">
                    · 지갑 연결 시 PC와 모바일 디바이스는 동일한 네트워크에 있어야
                    WalletConnect가 정상적으로 작동합니다.
                    <br />
                    · 브라우저 팝업 차단을 해제해야 WalletConnect 팝업이 표시됩니다.
                    <br />
                    · 네트워크 연결이 불안정하면 지갑 연결이 실패할 수 있으니 안정적인
                    환경에서 시도해주세요.
                    <br />
                    <span id="text-highlight">
                    · 안정적인 연결을 위해 Trust Wallet으로 연결하는 것을 권장드립니다.
                    </span>
                </div>
            </div>
            <br></br>
            <Explain />
        </div>
    );
};

export default WalletSection;