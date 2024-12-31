import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import './connected.css';
import { WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import axios from 'axios';
import {Modal} from '../modal/Modal'

interface NFT {
	image: string;
	name: string;
	description: string;
	mint_address: string;
}

const getPrizeAmount = async (address: string, mint_address: string) => {	
	try {
		const response = await axios.get(`https://bsp.ltcwareko.com/getSolanaPrizeAmount?address=${address}&mint_address=${mint_address}`);
		const prizeAmount = response.data;
		console.log('Prize amount:', prizeAmount);
	} catch (error) {
		console.error('Error fetching prize amount:', error);
	}
}

export const Connected: React.FC = () => {

	//// 모달창 컨트롤
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
	////

	const { connected, publicKey } = useWallet();
	const [loading, setLoading] = React.useState(false);

	const [nftData, setNftData] = React.useState<NFT[]>([]);
	const address = publicKey?.toBase58() || '';
	// const address = "Aer7qXzAax8UUWf4UKAsXaNVD4p6uMVTWeVbgWFLTSem";

	const fetchNFTData = async (address: string) => {
		setLoading(true);
		try {
			const response = await axios.get(`https://bsp.ltcwareko.com/getSolanaNFTData?address=${address}`);
			setNftData(response.data.data.value.nft_data);
			console.log(response.data.data.value.nft_data);
		} catch (error) {
			console.error('Error fetching NFT data:', error);
		} finally {
			setLoading(false);
		}
	};

	const saveMintAddressesToDB = async (nftData: NFT[]) => {
		try {
			const mintAddresses = nftData.map(nft => nft.mint_address);
			await axios.post('https://your-web-db-endpoint.com/saveMintAddresses', { mintAddresses });
			console.log('Mint addresses saved to DB');
		} catch (error) {
			console.error('Error saving mint addresses to DB:', error);
		}
	};

	React.useEffect(() => {
		if (nftData.length > 0) {
			saveMintAddressesToDB(nftData);
		}
	}, [nftData]);

	React.useEffect(() => {
		if (address) {
			fetchNFTData(address);
		}
		console.log('Component has loaded');
	}, [address]);

	if (loading) {
		console.log('Loading NFT data...');
	}

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
						{nftData && nftData.length > 0 ? (
							nftData.map((nft, index) => (
								<div key={index} id="nft-card">
									<div id="nft-image-container">
										<div id="nft-image-wrapper">
											<img loading="lazy" src={nft.image} id="nft-image" />
										</div>
									</div>
									<div id="nft-details">
										<div id="nft-text">
											<div id="nft-title">{nft.name}</div>
											<div id="nft-description">{nft.description}</div>
										</div>
									</div>
									<button id="exchange-btn" onClick={() => getPrizeAmount(address, nft.mint_address)}>교환 금액 확인</button>
								</div>
							))
						) : (
							<div id="no-nft-message">
								{/* // 임시테스트버튼 */}
								<button onClick={openModal}>Exchange Button</button>
								waffleee NFT 데이터를 불러올 수 없습니다.
							</div>

						)}
					</div>
				</div>
				{/* 모달 컴포넌트 */}
				<Modal isOpen={isModalOpen} onClose={closeModal} />
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
