import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react'
import './connected.css';
import { WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';

// 표 컴포넌트 정의
export const Connected: React.FC = () => {

    const { connected, publicKey } = useWallet(); // 지갑 연결 상태 확인

    if (connected) {
        return (
			<div id="nft-exchange-container">
			<div id="wallet-connection">
				<div id="wallet-status">
				<div id="wallet-info">
					<div id="address-wrapper">
					<img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8d3990382a5c30efd6b94fc8514f61ed0d8daf4b63fd4f300b6a6f84acd4f0b2?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8" id="wallet-icon" alt="Wallet connection status icon" />
					<div>{publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}에 연결됨</div>
					</div>
					<WalletDisconnectButton />
				</div>
				</div>
			</div>
			<div id="instructions">
				<div id="primary-text">
				연결된 계좌의 모든 NFT를 불러왔습니다.<br />
				'교환 금액 확인' 버튼을 눌러 USHD 수량을 확인하세요.
				</div>
				<div id="secondary-text">
				NFT 1개가 보유할 수 있는 최대 수량은 3000 USHD입니다. 유저에 따라서 수량이 다르게 계산됩니다.<br />
				수량이 마음에 안들면 재추첨을 통해 교환할 수 있습니다. 재추첨은 하루 최대 5회만 가능합니다.
				</div>
			</div>
			<div id="nft-display">
				<div id="nft-card-wrapper">
				<div id="nft-card">
					<div id="nft-image-container">
					<div id="nft-image-wrapper">
						<img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/de6380ad135d8dcbc54c9ac73b9dc8b6eeb05db1c14e516e5bf8f25283274a68?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8" id="nft-image" alt="Uniwaffle Friends #192 NFT" />
						<img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/82f4316bb22998f33a8564a20eed1764eb429fd28d7d067059a1bc748945dd43?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8" id="collection-badge" alt="Collection badge" />
					</div>
					</div>
					<div id="nft-details">
					<div id="nft-text">
						<div id="nft-title">Uniwaffle Friends #192</div>
						<div id="nft-description">A Collection of Uniwaffle 2025 Beta Test Commemoratives</div>
					</div>
					</div>
					<button id="exchange-btn">교환 금액 확인</button>
				</div>
				</div>
			</div>
			<div id="summary-section">
				<div id="total-amount">
				<div id="amount-wrapper">
					<div id="amount-label">현재 지갑의 교환 금액 총합:</div>
					<div id="amount-value">0 USHD</div>
				</div>
				</div>
				<div id="retry-counter">
				<div>오늘 재추첨 남은 횟수: 5</div>
				</div>
			</div>
			</div>
        );
    }
    
};