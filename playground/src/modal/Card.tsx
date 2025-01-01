import React, {useState} from "react";
import "./Card.css";
import Player from "lottie-react";
import scratchOff from "../animation/scratch-off.json";
import coin from "../animation/coin.json";



export const Card: React.FC = () => {


  return (
    <div className="nft-card-wrapper">
              <div className="nft-card">
                <div className="nft-image-container">
                  <div className="nft-image-wrapper">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/de6380ad135d8dcbc54c9ac73b9dc8b6eeb05db1c14e516e5bf8f25283274a68?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8"
                      className="nft-artwork"
                      alt="Uniwaffle Friends #192 NFT artwork"
                    />
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/82f4316bb22998f33a8564a20eed1764eb429fd28d7d067059a1bc748945dd43?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8"
                      className="nft-creator-avatar"
                      alt="Creator profile"
                    />
                  </div>
                </div>
                <div className="nft-content">
                  <div className="nft-text-content">
                    <h2 className="nft-heading">Uniwaffle Friends #192</h2>
                    <p className="nft-description">
                      A Collection of Uniwaffle 2025 Beta Test Commemoratives
                    </p>
                  </div>
                </div>
                <div className="nft-price-section">
                  {/* <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/9377e8805dcc67ef3c8c6e3ffb4e8e6c2abe6963ea18a601733f74f94abc011d?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8"
                    className="nft-price-decoration"
                    alt=""
                    aria-hidden="true"
                  /> */}
                    <Player
                      autoplay
                      loop
                      animationData={scratchOff} // 여기서 src 대신 animationData를 사용
                      className="nft-price-decoration"
                    />
                    {/* 여기에 가격추가 */}
                    {/* <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3b4a0f870043798420ad058b7c2cd80c2e967cfb1bda70caa0857b9da48d3c22?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8"
                    alt="Hero section promotional image"
                    className="coin-image"
                    /> */}
                    <Player
                      autoplay
                      loop
                      animationData={coin} // 여기서 src 대신 animationData를 사용
                      className="coin-image"
                    />
                  
                </div>
              </div>
            </div>
  );
};

export default Card;