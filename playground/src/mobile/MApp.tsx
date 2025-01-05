import * as React from 'react';
import './MApp.css'

export const MApp: React.FC = () => {

  return (
      <>
        <section className="form-section">
        <form className="form-wrapper">
            <p className="form-title">유니와플 가입 계정의 이메일을 입력하고, NFT에 숨겨진 USHD 토큰의 수량을 확인해보세요!</p>
            <div className="input-group">
            {/* <label for="email" className="visually-hidden">이메일을 입력하세요</label> */}
            <input type="email" id="email" className="input-wrapper" placeholder="이메일을 입력하세요" required aria-label="이메일 입력" />
            </div>
            <button type="submit" className="submit-button">USHD 수량 확인하기</button>
        </form>
        </section>
      </>

            
  );
};

export default MApp;