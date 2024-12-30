import React from 'react';
import App from '../App.tsx'
import '../index.css'
import { SolanaContext } from '../SolanaContext.tsx'
import Explain from '../event/explain.tsx'

const WalletSection: React.FC = () => {
    return (
        <div id="wallet-section">
            <SolanaContext>
                <App />
            </SolanaContext>    
        </div>
    );
};

export default WalletSection;