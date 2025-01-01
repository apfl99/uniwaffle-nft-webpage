import React, {useState} from "react";
import "./Modal.css";
import "./Effect1.css";
import {Card} from './Card'
import Player from "lottie-react";
import animationData from "../animation/light.json";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // 모달이 열리지 않은 경우 렌더링하지 않음

  //// 교환하기 이펙트 관리
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleButtonClick = (): void => {
    setIsVisible(true);

    // 3초 후 자동으로 사라지게 설정
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };
  ////

  return (
    <div
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
    >
      <div className="nft-exchange-container">
        <div className="content-wrapper">
          <div className="nft-card-container">
            <div className="nft-card">
              <div className="image-container">
                <div className="image-wrapper">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/de6380ad135d8dcbc54c9ac73b9dc8b6eeb05db1c14e516e5bf8f25283274a68?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8"
                    className="nft-image"
                    alt="NFT artwork preview"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/82f4316bb22998f33a8564a20eed1764eb429fd28d7d067059a1bc748945dd43?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8"
                    className="profile-image"
                    alt="User profile"
                  />
                </div>
              </div>
              <div className="nft-info">
                <div className="title-container">
                  <div className="nft-title">Uniwaffle Friends #192</div>
                  <div className="nft-description">
                    A Collection of Uniwaffle 2025 Beta Test Commemoratives
                  </div>
                </div>
              </div>
              <div className="price-container">
                <div className="price-text">1849 USHD</div>
              </div>
            </div>
            <div className="price-large">1849 USHD</div>
          </div>


          <div className="exchange-info">
            <div className="info-text">
              <div className="main-text">
                NFT를 교환하려면
                <br />
                NFT 교환하기 버튼을 누르세요.
              </div>
              <div className="warning-text">
                교환하면 이전으로 되돌릴 수 없습니다.
              </div>
            </div>
            <div className="button-container">
              <button
                className="exchange-button"
                onClick={handleButtonClick}
              >
                NFT 교환하기
              </button>
              <button className="close-button" onClick={onClose}>
                창 닫기
              </button>
            </div>
          </div>

          <div className="preview-container">
              <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/89152492d7ab112b12c0a80950c134b3d88834f7b6f9d581c6bc32da0614bbd6?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8"
                  className="preview-image"
                  alt="NFT preview"
                />
            <div className="preview-price">??? USHD</div>
          </div>
        </div>
      </div>

      {/* 교환버튼 클릭시 카드뽑기 이펙트 */}
      <div className="effect1-container">
      {isVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* 첫 번째 이미지 */}
            <Player
              autoplay
              loop
              animationData={animationData} // 여기서 src 대신 animationData를 사용
              className="light-image"
            />
            {/* 두 번째 이미지를 겹침 */}
            <Card />
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Modal;