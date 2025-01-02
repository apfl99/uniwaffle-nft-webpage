import React from "react";
import Player from "lottie-react"; // 필요에 따라 import
import Card from "../modal/Card"; // Card 컴포넌트 경로
import animationData from "../animation/light.json";
import "./Effect.css"

interface EffectProps {
  isEffectOpen: boolean;
  closeEffect: () => void;
}

export const Effect: React.FC<EffectProps> = ({ isEffectOpen, closeEffect}) => {
  return (
    <div className="effect1-container">
      {isEffectOpen && (
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
