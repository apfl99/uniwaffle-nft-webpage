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
