import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import './connected.css';
import { WalletConnectButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import axios from 'axios';
import {Modal} from '../modal/Modal'
import {Effect} from '../effect/Effect'

interface NFT {
	image: string;
	name: string;
	description: string;
	mint_address: string;
	prize: number;
}

export const Connected: React.FC = () => {

	//// 모달창 컨트롤
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = (index: number) => {
		setIsModalOpen(true);
		setExchangeSelected(index);
	};
	const closeModal = () => setIsModalOpen(false);
	
	//// 이펙트창 컨트롤
	const [isEffectOpen, setIsEffectOpen] = useState(false);
	const [selected, setSelected] = useState(-1);
	const [exchangeSelected, setExchangeSelected] = useState(-1);
	const [check, setCheck] = useState<boolean[]>(Array(20).fill(false)); // 이펙트 확인여부 체크 배열(열어봤으면 금액 표시 + 교환하기 버튼 위해)

	// 특정 인덱스 상태 업데이트 함수
	const updateCheck = (index: number) => {
		setCheck((prev) => {
			const newArray = [...prev];
			newArray[index] = true; // 변경된 원소
			return newArray; // 새로운 참조 반환
		});
	};

	const openEffect = () => setIsEffectOpen(true);
	const closeEffect = () =>{
		setIsEffectOpen(false);
		updateCheck(selected); // 이펙트창 닫으면 check 업데이트
	}
	////

	const { connected, publicKey } = useWallet();
	const [loading, setLoading] = React.useState(false);
	const [nftData, setNftData] = React.useState<NFT[]>([]);
	const [sum, setSum] = useState(0);
	// const address = publicKey?.toBase58() || '';
	const address = "EfNiFGT8iJv4NEtQG5GsprhwFQze5Eaai7Dod3uq6pzZ";

	const fetchNFTData = async (address: string) => {
		setLoading(true);
		try {
			const response = await axios.get(`https://bsp.ltcwareko.com/getSolanaNFTData?address=${address}`);
			setNftData(response.data.data.value.nft_data);
		} catch (error) {
			console.error('Error fetching NFT data:', error);
		} finally {
			setLoading(false);
		}
	};

	const getPrizeAmount = async (address: string, mint_address: string, index: number) => {	
		try {
			const response = await axios.get(`https://bsp.ltcwareko.com/getSolanaPrizeAmount?address=${address}&mint_address=${mint_address}`);
			const prizeAmount = response.data.data;

			if (prizeAmount.value != null) {

				nftData[index].prize = prizeAmount.value.prize;

				// 가격 useState 업데이트
				setNftData((prev)=>{
					const newArray = [...prev];
					newArray[index].prize = prizeAmount.value.prize; // 변경된 원소
					return newArray; // 새로운 참조 반환
					}
				)
				
			}
			console.log('Prize amount:', prizeAmount);
		} catch (error) {
			console.error('Error fetching prize amount:', error);
		}
	}

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
		// nft 별로 가각 USHD 금액 가져오기 
			if (nftData.length > 0) {

				nftData.forEach((nft, index) => {
					console.log("haha " + address + " "+ index +" " + nft.mint_address);
					getPrizeAmount(address, nft.mint_address, index);
				}
			)
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
					<div className="wallet-container">
					<div className="balance-wrapper">
						<div className="balance-label">현재 지갑의 교환 금액 총합:</div>
						<div className="balance-amount">{sum} USHD</div>
					</div>
					<div className="exchange-limit-wrapper">
						<div className="exchange-limit-container">
						<div className="exchange-limit-text">오늘 남은 교환 횟수: 3</div>
						</div>
					</div>
				</div>
				<div id="instructions">
					<div id="primary-text">
						연결된 계좌의 모든 NFT를 불러왔습니다.<br />
						'USHD 수량 확인' 버튼을 눌러 USHD 수량을 확인하세요.
					</div>
					<div id="secondary-text">
						NFT 1개가 보유할 수 있는 최대 수량은 1000 USHD입니다. 유저에 따라서 수량이 다르게 계산됩니다.<br />
						수량이 마음에 안들면 '교환하기'버튼을 통해 다른 NFT로 교환할 수 있습니다. 교환은 하루 최대 3회만 가능합니다.
					</div>
				</div>
				<div id="nft-display">
					<div id="nft-card-wrapper">
						{nftData && nftData.length > 0 ? (
							nftData.map((nft, index) => (
								
								<div className="ncard-container">
									<div className="ncard">
										<div className="nimage-container">
											<div className="nimage-wrapper">
											<img
												loading="lazy"
												src={nft.image}
												className="nimage"
												alt="artwork preview"
											/>
											<img
												loading="lazy"
												src="https://cdn.builder.io/api/v1/image/assets/TEMP/82f4316bb22998f33a8564a20eed1764eb429fd28d7d067059a1bc748945dd43?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8"
												className="nprofile-image"
												alt="User profile"
											/>
											</div>
										</div>
										<div className="ninfo">
											<div className="ntitle-container">
											<div className="ntitle">{nft.name}</div>
											<div className="ndescription">
												{nft.description}
											</div>
											</div>
										</div>

										
										{check[index] ? 
											(
												<div className="price-container">
													<div className="price-text">{nft.prize} USHD</div>
												</div>
											) 
												: 
											(
												<button id="exchange-btn" onClick={() => {
													setSum(sum + nft.prize);
													setSelected(index); //nft 배열 인덱스 
													openEffect(); // Effect 창 open 
												}}>USHD 수량 확인</button>
											)
										}
									</div>
									{check[index] && 
									(<button className="nclose-button" onClick={()=>openModal(index)}>
										교환하기
									</button>)
									}
								</div>

							))
						) : (
							<div id="no-nft-message">
								waffleee NFT 데이터를 불러올 수 없습니다.		
							</div>

						)}
					</div>
				</div>
				{/* 교환금액 확인 이펙트 */}
				<Effect isEffectOpen={isEffectOpen} closeEffect={closeEffect} nft={nftData[selected]}/>
				<Modal isOpen={isModalOpen} onClose={closeModal} nft={nftData[exchangeSelected]} />
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
			</div>
		);
	}
};
