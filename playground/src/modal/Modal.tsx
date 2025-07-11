import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Player from "lottie-react";
import animationData from "../animation/light.json";
import loading from "../animation/loading.json"
import "./Modal.css";
// NFT 교환
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import type { Connection, TransactionSignature } from '@solana/web3.js'
import { Transaction, TransactionInstruction, Keypair, PublicKey, AccountMeta, ComputeBudgetProgram } from '@solana/web3.js'
import { createAssociatedTokenAccountInstruction, createTransferCheckedInstruction, getAccount, getAssociatedTokenAddressSync, getAssociatedTokenAddress } from '@solana/spl-token'
import axios from 'axios';

interface NFT {
	image: string;
	name: string;
	description: string;
	mint_address: string;
	prize: number;
	owner: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  nft: NFT;
  prize: number;
  onChange: (value: number) => void;
  onChangeNFTData: (value: NFT[]) => void;  
  originNFTData: NFT[];
  onChangeSum: (value: number) => void;
  sum : number;
  exchangeSelected: number;
}


const MasterAddress = "Cb4Z8eRfdoPpojwfaownPhS86Z4TzukrSVLZfn6HLfDR"

const getATA = async (mint_address: string, from_address: PublicKey) => {
    // Convert input addresses to PublicKey
    const fromPublicKey = new PublicKey(from_address);
    const mintPublicKey = new PublicKey(mint_address);
  
    // Get the associated token address
    const ata = await getAssociatedTokenAddress(
      mintPublicKey, // The mint address of the token
      fromPublicKey, // The owner's wallet address
      false // Set to true if the mint is a non-fungible token (NFT)
    );
  
    return ata.toBase58();
}

const decreaseChance = (address: string) => {
  var result = 0;
  fetch(`https://ums.ltcwareko.com/decreaseChance?address=${address}`)
    .then((response) => response.json())
    .then((data) => {
      result = data.data[0].chance;    
    });
  return result;
}


export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, nft, prize, onChange, onChangeNFTData, originNFTData, onChangeSum, sum, exchangeSelected }) => {
  const [isInactive, setIsInactive] = useState(true); // 버튼 클릭 상태
  const Firstcontrols = useAnimation();
  const Secondcontrols = useAnimation();
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()
  const [SignaturePending, setSignaturePending] = useState(false);
  const [TransactionPending, setTransactionPending] = useState(false);
  const [updatedNFT, setUpdatedNFT] = useState<NFT>({image: "", name: "", description: "", mint_address: "", prize: 0, owner: ""});

  const handleExchangeClick = async () => {
    // 교환 요청
    await SendNFTTransaction(nft.mint_address);
  };

  const SendNFTTransaction = async (mint_address: string) => {
    try {
      let signature: TransactionSignature | undefined = undefined
      if (!publicKey) throw new Error('Wallet not connected!')
      let account
      // contract address
      let mint = new PublicKey(mint_address)
      // from solana address
      let fromWallet = new PublicKey(publicKey.toBase58())
      // from token address
      let ata = await getATA(mint_address, fromWallet)
      let fromATA = new PublicKey(ata)
      // to solana address
      let toWallet = new PublicKey(MasterAddress)
  
      const associatedToken = getAssociatedTokenAddressSync(
          mint,
          toWallet,
      );
      const {
          context: { slot: minContextSlot },
          value: { blockhash, lastValidBlockHeight },
      } = await connection.getLatestBlockhashAndContext()
  
      const transaction = new Transaction({
          feePayer: publicKey,
          recentBlockhash: blockhash,
      })
      const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
        units: 100000,
      });
      const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
          microLamports: 200000,
      });

      transaction.add(modifyComputeUnits);
      transaction.add(addPriorityFee);
      try {
        account = await getAccount(connection, associatedToken);
      } catch (error: unknown) {
        // if no associated token account exists at to solana address, create it
        try {
          transaction.add(
              createAssociatedTokenAccountInstruction(
                  publicKey,
                  associatedToken,
                  toWallet,
                  mint,
              ),
          );
        } catch (error: unknown) {
          // Ignore all errors; for now there is no API-compatible way to selectively ignore the expected
          // instruction error if the associated account exists already.
          console.log(error)
        }
  
        // Now this should always succeed
        account = await getAccount(connection, associatedToken);
      }
  
      transaction.add(
          createTransferCheckedInstruction(
              fromATA,
              mint,
              account.address,
              fromWallet,
              1,
              0
          )
      )
  
      // 트랜 보내는데
      setSignaturePending(true);
      signature = await sendTransaction(transaction, connection, { minContextSlot })

      // 트랜잭션 실패시 실행 x
      setSignaturePending(false); // 트랜잭션 성공시 시그니처 펜딩 끄기
      setTransactionPending(true); // 트랜잭션 성공시 확인때까지 트랜잭션 펜딩 켜기

      try {
        const result = await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });
        console.log('Transaction confirmed:', result);
      } catch (error: unknown) {
        console.warn(`Transaction confirmed! ${(error as Error)?.message}`);
      }
      
      // 1초마다 NFT 조회
      let attempts = 0;
      const maxAttempts = 180;
      const address = publicKey.toBase58();
      while (attempts < maxAttempts) {
        try {
          const response = await axios.get(`https://bsp.ltcwareko.com/getSolanaNFTData?address=${address}`);
          const newNFTData = response.data.data.value.nft_data;
          const updatedNFTData = newNFTData.filter((newNFT: NFT) => 
            !originNFTData.some((originNFT: NFT) => originNFT.mint_address === newNFT.mint_address)
          );

          const finalNFTData = originNFTData.map((nft, index) => 
            index === exchangeSelected ? updatedNFTData[0] : nft
          );

          if (updatedNFTData.length > 0) {
            const response = await axios.get(`https://bsp.ltcwareko.com/getSolanaPrizeAmount?address=${address}&mint_address=${updatedNFTData[0].mint_address}`);
            const prizeAmount = response.data.data;
            updatedNFTData[0].prize = prizeAmount.value.prize;
            setUpdatedNFT(updatedNFTData[0]);
            onChangeNFTData(finalNFTData);
            // 합계 금액 변경
            var updatedSum = sum-prize+updatedNFTData[0].prize;
            onChangeSum(updatedSum);
            localStorage.setItem('sum', JSON.stringify(updatedSum));
            break;
          }

          attempts++;
          await new Promise(resolve => setTimeout(resolve, 1000)); 
        } catch (error) {
          console.error('Error fetching NFT data:', error);
        }
      }
      // 실패시 에러
      if (attempts === maxAttempts) {
        throw new Error('Failed to fetch NFT data');
      }

      setTransactionPending(false); // 성공시 트랜잭션 펜딩 끄기

      // 성공시 애니메이션 실행
      setIsInactive(false);
      FirstCardAnimation();
      SecondCardAnimation();


      // 교환 횟수 차감
      const decreasedChance = decreaseChance(publicKey.toBase58());
      onChange(decreasedChance);
    } catch (error: unknown) {
        alert("교환에 실패했습니다 다시 시도해주세요.")
        setSignaturePending(false);
        setTransactionPending(false)
    }
  }

  const handleCloseTab = () => {
    setIsInactive(true);
    setSignaturePending(false);
    setTransactionPending(false);
    onClose();
  };

  // 왼쪽 NFT 이미지 애니메이션
  const FirstCardAnimation = async () => {
    // 첫 번째 애니메이션 실행(중앙 움직이기)
    await Firstcontrols.start({
      transform: "translateX(152%)",
      transition: { duration: 2 },
    });
    // 두 번째 애니메이션 실행(사라지기)
    await Firstcontrols.start({
      opacity: 0,
      transition: { duration: 0.5 },
    });
  };


  // 오른쪽 카드 뒷면 이미지 애니메이션
  const SecondCardAnimation = async () => {
    // 첫 번째 애니메이션 실행(중앙 움직이기)
    await Secondcontrols.start({
      transform: "translateX(-147%)",
      transition: { duration: 2 },
    });
    // 두 번째 애니메이션 실행(사라지기)
    await Secondcontrols.start({
      opacity: 0,
      transition: { duration: 2 },
    });
  };


  if (!isOpen) return null; // 모달이 열리지 않으면 렌더링하지 않음

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      animate={{backgroundColor: isInactive ?  "fffff": "#313233"}}
    >
      
      <motion.div className="exchange-container"
        initial={{backgroundColor : "rgba(247, 250, 254, 1)"}}
        animate={{backgroundColor : isInactive ? "#f7fafe" : "transparent"}}
        transition={{ duration: 1 }}
      >
        <div className="content-wrapper">
          <div className="card-container">
            <motion.div className="card"
              animate={Firstcontrols}
              transition={{ duration: 2 }}
            >
              <div className="image-container">
                <div className="image-wrapper">
                  <img
                    loading="lazy"
                    src={nft.image}
                    className="image"
                    alt="artwork preview"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/82f4316bb22998f33a8564a20eed1764eb429fd28d7d067059a1bc748945dd43?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8"
                    className="profile-image"
                    alt="User profile"
                  />
                </div>
              </div>
              <div className="info">
                <div className="title-container">
                  <div className="title">{nft.name}</div>
                  <div className="description">
                    {nft.description}
                  </div>
                </div>
              </div>
              <div className="price-container">
                <div className="price-text">{prize} USHD</div>
              </div>
            </motion.div>
            <motion.div className="price-large"
              initial={{ opacity: 1 }} // 초기 상태
              animate={{ opacity: isInactive ? 1 : 0 }} // 애니메이션 상태
              transition={{ duration: 0.5 }}
            >
              {prize} USHD
            </motion.div>
          </div>
          
              <motion.div className="exchange-info"
                initial={{ opacity: 1 }} // 초기 상태
                animate={{ opacity: isInactive ? 1 : 0 }} // 애니메이션 상태
                transition={{ duration: 0.5 }}>
                  
                  {TransactionPending ? (

                    <div className="exchange-status">
                      <Player 
                        autoplay
                        loop={true}
                        animationData={loading}
                        className="status-icon">
                      </Player>
                      <div className="status-message">
                        <div className="status-title">교환을 진행하고 있습니다</div>
                        <div className="status-description">
                          최대 3분 정도 소요될 수 있습니다. 잠시만 기다려주세요.
                        </div>
                        <div className="status-description-h">
                          교환 중에는 유니와플 앱을 종료하지 마세요.
                        </div>
                        <div className="status-description">
                          NFT 수신 메시지를 확인하셔야 교환이 완료됩니다.
                        </div>
                      </div>
                    </div>


                  ) : (
                    SignaturePending ? (
                      <div className="info-text">
                        <div className="main-text" style={{color: "red"}}>
                          UniWaffle 어플리케이션에서
                          <br />
                          동의를 눌러주세요.
                        </div>
                        <div className="warning-text">
                          교환하면 이전으로 되돌릴 수 없습니다.
                        </div>
                      </div>
                      
                    ) : (
  
                      <div className="info-text">
                        <div className="main-text">
                          교환하려면
                          <br />
                          교환하기 버튼을 누르세요.
                        </div>
                        <div className="warning-text">
                          교환하면 이전으로 되돌릴 수 없습니다.
                        </div>
                      </div>
                    )

                  )}


              {!TransactionPending && (<div className="button-container">

                {SignaturePending ? (
                  <button className="exchange-button" style={{cursor: "not-allowed"}}>
                    교환하기
                  </button>
                ) : (
                  <button className="exchange-button" onClick={handleExchangeClick}>
                    교환하기
                  </button>
                )}
                <button className="close-button" onClick={onClose}>
                  <u>창 닫기</u>
                </button>
              </div>) }


              </motion.div>




          {/* 후광 이미지 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isInactive ? 0 : 1 }}
            transition={{ duration: 0.5 }}
            className="light-image2"
          >
            <Player
              autoplay
              loop
              animationData={animationData}
              className="light-image2"
            />
          </motion.div>

          <motion.div className="new-card-wrapper"
          initial={{opacity: 0}}
          animate={{opacity: isInactive ? 0 : 1}}
          transition={{ duration: 2, delay: 2 }}
          >
            {/* 새로 생성되는 카드 */}
            <div className="card">
              <div className="image-container" style={{marginTop: "7px"}}>
                <div className="image-wrapper">
                  <img
                    loading="lazy"
                    src={updatedNFT.image}
                    className="image"
                    alt="artwork preview"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/82f4316bb22998f33a8564a20eed1764eb429fd28d7d067059a1bc748945dd43?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8"
                    className="profile-image"
                    alt="User profile"
                  />
                </div>
              </div>
              <div className="info">
                <div className="title-container">
                  <div className="title">{updatedNFT.name}</div>
                  <div className="description">
                    {updatedNFT.description}
                  </div>
                </div>
              </div>
              <div className="price-container">
                <div className="price-text">{updatedNFT.prize} USHD</div>
              </div>
            </div>
            <button 
              className="close-button2" 
              onClick={handleCloseTab}
            >
            닫기
            </button>
          </motion.div>

          

          <div className="preview-container">
            <motion.img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/89152492d7ab112b12c0a80950c134b3d88834f7b6f9d581c6bc32da0614bbd6?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8"
              className="preview-image"
              alt="preview"
              animate={Secondcontrols}
            />
            <motion.div className="preview-price" 
              initial={{ opacity: 1 }} // 초기 상태
              animate={{ opacity: isInactive ? 1 : 0 }} // 애니메이션 상태
              transition={{ duration: 0.5 }}
              >
                ??? USHD
              </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
