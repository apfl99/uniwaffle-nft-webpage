import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Player from "lottie-react";
import animationData from "../animation/light.json";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isInactive, setIsInactive] = useState(true); // 버튼 클릭 상태
  const Firstcontrols = useAnimation();
  const Secondcontrols = useAnimation();

  const handleExchangeClick = () => {
    setIsInactive(false); // 사라지는 애니메이션 트리거
    FirstCardAnimation();
    SecondCardAnimation();
  };

  const handleCloseTab = () => {
    setIsInactive(true);
    onClose();
  };

  // 왼쪽 NFT 이미지 애니메이션
  const FirstCardAnimation = async () => {
    // 첫 번째 애니메이션 실행(중앙 움직이기)
    await Firstcontrols.start({
      transform: "translateX(136.5%)",
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
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/de6380ad135d8dcbc54c9ac73b9dc8b6eeb05db1c14e516e5bf8f25283274a68?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8"
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
                  <div className="title">Uniwaffle Friends #192</div>
                  <div className="description">
                    A Collection of Uniwaffle 2025 Beta Test Commemoratives
                  </div>
                </div>
              </div>
              <div className="price-container">
                <div className="price-text">1849 USHD</div>
              </div>
            </motion.div>
            <motion.div className="price-large"
              initial={{ opacity: 1 }} // 초기 상태
              animate={{ opacity: isInactive ? 1 : 0 }} // 애니메이션 상태
              transition={{ duration: 0.5 }}
            >
              1849 USHD
            </motion.div>
          </div>
          
          <motion.div className="exchange-info"
            initial={{ opacity: 1 }} // 초기 상태
            animate={{ opacity: isInactive ? 1 : 0 }} // 애니메이션 상태
            transition={{ duration: 0.5 }}>
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
            <div className="button-container">
              <button className="exchange-button" onClick={handleExchangeClick}>
                교환하기
              </button>
              <button className="close-button" onClick={onClose}>
                창 닫기
              </button>
            </div>
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
              <div className="image-container">
                <div className="image-wrapper">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/de6380ad135d8dcbc54c9ac73b9dc8b6eeb05db1c14e516e5bf8f25283274a68?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8"
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
                  <div className="title">Uniwaffle Friends #192</div>
                  <div className="description">
                    A Collection of Uniwaffle 2025 Beta Test Commemoratives
                  </div>
                </div>
              </div>
              <div className="price-container">
                <div className="price-text">1849 USHD</div>
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
