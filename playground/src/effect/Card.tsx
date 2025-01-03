import "./Card.css";
import Player from "lottie-react";
import scratchOff from "../animation/scratch-off.json";
import coin from "../animation/coin.json";

interface CardProps {
  nft: NFT;
}

interface NFT {
	image: string;
	name: string;
	description: string;
	mint_address: string;
}

export const Card: React.FC<CardProps> = ({nft}) => {

  return (
    <div className="nft-card-wrapper">
      <div className="nft-card">
        <div className="nft-image-container">
          <div className="nft-image-wrapper">
            <img
              loading="lazy"
              src={nft.image}
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
            <h2 className="nft-heading">{nft.name}</h2>
            <p className="nft-description">
              {nft.description}
            </p>
          </div>
        </div>
        <div className="nft-price-section">
          <span className="effect-text">1849 USHD</span>
          <Player
            autoplay
            loop={false}
            animationData={scratchOff}
            className="nft-price-decoration"
          />
          <Player
            autoplay
            loop={false}
            animationData={coin}
            className="coin-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
