import React from "react";
import Player from "lottie-react"; // 필요에 따라 import
import Card from "./Card"; // Card 컴포넌트 경로
import animationData from "../animation/light.json";
import "./Effect.css"

interface EffectProps {
  isEffectOpen: boolean;
  closeEffect: () => void;
  nft: NFT;
}

interface NFT {
	image: string;
	name: string;
	description: string;
  mint_address: string;
  prize: number;
}

export const Effect: React.FC<EffectProps> = ({ isEffectOpen, closeEffect, nft}) => {
  return (
    <div className="effect1-container">
      {isEffectOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* 후광 이미지 */}
            <Player
              autoplay
              loop
              animationData={animationData} // 여기서 src 대신 animationData를 사용
              className="light-image"
            />
            {/* NFT 이미지 */}
            <Card nft={nft}/>
            <button className="close-effect-button" onClick={closeEffect}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Effect;
