import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import './App.css'
import { Toaster } from 'react-hot-toast'
import { useWallet } from '@solana/wallet-adapter-react'
import Help from './event/help';
import Explain from './event/explain';
import { Connected } from './components/Connected';

function App() {

	const {connected} = useWallet();


	if (connected) {
		return(
			<Connected	/>
		)
	} else {
		return (
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
				<br />
				<WalletMultiButton />
				<Help />
				<Explain />
			</div>
		)
	}

}

export default App
