import React from 'react';
import App from '../App.tsx'
import '../index.css'
import { SolanaContext } from '../SolanaContext.tsx'
import Explain from '../event/explain.tsx'

const Help: React.FC = () => {
    return (
        <div>
            <div id="wallet-content">'지갑 연결하기' 버튼을 클릭해주세요.</div>
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
        </div>
    );
};

export default Help;