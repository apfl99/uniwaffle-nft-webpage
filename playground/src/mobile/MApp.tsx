import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import './MApp.css'

interface NFT {
	image: string;
	name: string;
	description: string;
	mint_address: string;
}

export const MApp: React.FC = () => {

  const [email, setEmail] = useState('');
  const [isVerified, setIsVerified] = useState(false); // 인증 성공 여부

  const [loading, setLoading] = React.useState(false);
  const [nftData, setNftData] = React.useState<NFT[]>([]);

  const address = "Aer7qXzAax8UUWf4UKAsXaNVD4p6uMVTWeVbgWFLTSem";

  React.useEffect(() => {
      if (address) {
        fetchNFTData(address);
      }
      console.log('Component has loaded');
    }, [address]);
  
  const handleSubmit = () => {

    setIsVerified(true);
    // try {
    //   // 이메일 인증 API 호출 (예제)
    //   const response = await fetch('/api/verify-email', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email }),
    //   });

    //   if (response.ok) {
    //     // 인증 성공 시 상태 변경
    //     setIsVerified(true);
    //   } else {
    //     // 인증 실패 처리
    //     alert('이메일 인증에 실패했습니다.');
    //   }
    // } catch (error) {
    //   console.error('인증 중 오류 발생:', error);
    //   alert('오류가 발생했습니다. 다시 시도해주세요.');
    // }
  };

	const fetchNFTData = async (address: string) => {
		setLoading(true);
		try {
			const response = await axios.get(`https://bsp.ltcwareko.com/getSolanaNFTData?address=${address}`);
			setNftData(response.data.data.value.nft_data);
			console.log(response.data.data.value.nft_data);
		} catch (error) {
			console.error('Error fetching NFT data:', error);
		} finally {
			setLoading(false);
		}
	};

  // 조건부 렌더링: 인증 성공 여부에 따라 화면 변경
  if (isVerified) {
    return (
      <div className="nft-exchange-container3">
        <div className="exchange-wrapper3">
          <div className="header-content3">
            <div className="header-title3">
              계좌의 모든 NFT를 불러왔습니다.
              <br />
              NFT의 USHD 수량을 확인하세요.
            </div>
            <div className="header-warning3">
              NFT를 교환하는 기능은
              <br />
              PC 환경에서만 가능합니다.
            </div>
          </div>

          <div className="nft-card-section3">
            {nftData && nftData.length > 0 ? (
                nftData.map((nft, index)=>(
                  <div className="nft-card3">
                    <div className="image-container3">
                      <div className="image-wrapper3">
                        <img
                          loading="lazy"
                          src={nft.image}
                          className="nft-image3"
                          alt="Uniwaffle Friends #192 NFT"
                        />
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/92d01d9c872c759d8eea097cb12d4884c31498d8328fade81f97b8d60cdb2c66?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8"
                          className="profile-image3"
                          alt="Profile avatar"
                        />
                      </div>
                    </div>
                    <div className="nft-info3">
                      <div className="info-content3">
                        <h2 className="nft-title3">{nft.name}</h2>
                        <p className="nft-description3">
                          {nft.description}
                        </p>
                        <div className="nft-price3">1849 USHD</div>
                      </div>
                    </div>
                  </div>
                )
              )

            ): (
							<div id="no-nft-message">
								waffleee NFT 데이터를 불러올 수 없습니다.		
							</div>

						)}

            <div className="nft-card3">
              <div className="image-container3">
                <div className="image-wrapper3">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1704444c9b4801c3a6ba0a7ae57063ce05bc4779f86b77f1ac4fea4d8ff0ef0e?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8"
                    className="nft-image3"
                    alt="Uniwaffle Friends #192 NFT"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/92d01d9c872c759d8eea097cb12d4884c31498d8328fade81f97b8d60cdb2c66?placeholderIfAbsent=true&apiKey=5af3aa077a7b43c6a493f500437ba1d8"
                    className="profile-image3"
                    alt="Profile avatar"
                  />
                </div>
              </div>
              <div className="nft-info3">
                <div className="info-content3">
                  <h2 className="nft-title3">Uniwaffle Friends #192</h2>
                  <p className="nft-description3">
                    A Collection of Uniwaffle 2025 Beta Test Commemoratives
                  </p>
                  <div className="nft-price3">1849 USHD</div>
                </div>
              </div>
            </div>
          </div>

          <div className="total-amount3">
            <div className="amount-wrapper3">
              <div className="amount-label3">
                현재 지갑의 교환 금액 총합:
              </div>
              <div className="amount-value3">1849 USHD</div>
            </div>
          </div>
          <button className="back-button3" tabIndex={0} onClick={()=>setIsVerified(false)}>
            <span className="button-text3">이전으로 돌아가기</span>
          </button>
        </div>
      </div>
    );
  }


  return (
      <>
        <section className="form-section">
        <form className="form-wrapper" onSubmit={handleSubmit}>
          <p className="form-title">
            유니와플 가입 계정의 이메일을 입력하고, NFT에 숨겨진 USHD 토큰의 수량을 확인해보세요!
          </p>
          <div className="input-group">
            <label htmlFor="email" className="visually-hidden">이메일을 입력하세요</label>
            <input
              type="email"
              id="email"
              className="input-wrapper"
              placeholder="이메일을 입력하세요"
              required
              aria-label="이메일 입력"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-button">USHD 수량 확인하기</button>
        </form>
      </section>
      </>

            
  );
};

export default MApp;