import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import './MApp.css'

interface NFT {
	image: string;
	name: string;
	description: string;
	mint_address: string;
  owner: string;
}

export const MApp: React.FC = () => {

  const [email, setEmail] = useState('');
  const [isVerified, setIsVerified] = useState(false); // 인증 성공 여부
  const [isInValidEmail, setIsInValidEmail] = useState(false);
  const [nftData, setNftData] = React.useState<NFT[]>([]);
  const [prize, setPrize] = useState(Array(20).fill(0));
  const [sum, setSum] = useState(0);

  React.useEffect(() => {
    // nft 별로 가각 USHD 금액 가져오기 
    setSum(0);
			if (nftData.length > 0) {
				nftData.forEach((nft, index) => {
					// console.log("haha " + address + " "+ index +" " + nft.mint_address);
					getPrizeAmount(nft.owner, nft.mint_address, index); //수정 예정
				}
			)
		}
  }, [nftData]);
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault(); // 폼의 기본 동작(새로고침)을 막음
      // try {
      //   const vaild = await axios.get(`https://ums.ltcwareko.com/checkUserEmailExists?email_address=${email}`);
      //   console.log(vaild.data);
      //   if (vaild.data.status != 201) {
      //     alert("유효하지 않은 이메일입니다.")
      //   }
      // } catch(error) {
      //   console.error('Error verifying email:', error);
      // }
      // console.log("haha");
      setSum(0);

      try {
        const res = await axios.get(`https://ums.ltcwareko.com/getGUIDFromEmail?email=${email}`);
        // console.log(res);
        const guid = res.data.data.GUID
        // console.log(guid);

        const nft_res = await axios.get(`https://bsp.ltcwareko.com/getSolanaNFTDataFromGUID?guid=${guid}`)
        const nft_data = nft_res.data.data.value.nft_data
        
        // console.log(nft_data);
        setNftData(nft_data)

        // Verified 화면 true 세팅
        setIsVerified(true);
        setIsInValidEmail(false);
      } catch {
        console.error("getGUIDFromEmail Error");
        setIsInValidEmail(true);
      }

    };


  const getPrizeAmount = async (address: string, mint_address: string, index: number) => {	
    try {
      const response = await axios.get(`https://bsp.ltcwareko.com/getSolanaPrizeAmount?address=${address}&mint_address=${mint_address}`);
      const prizeAmount = response.data.data;

      if (prizeAmount.value != null) {
        setPrize((prev) => {
          const newArray = [...prev];
          newArray[index] = prizeAmount.value.prize; // 변경된 원소
          setSum(sum + newArray[index]);
          return newArray; // 새로운 참조 반환
        });
        // nftData[index].prize = prizeAmount.value.prize;
      } else {
        // setPrize((prev) => {
        // 	const newArray = [...prev];
        // 	newArray[index] = 0; // 변경된 원소
        // 	return newArray; // 새로운 참조 반환
        // });
      }
      console.log(prizeAmount)

    } catch (error) {
      console.error('Error fetching prize amount:', error);
    }
  }

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
                        <div className="nft-description3">
                          {nft.description}
                        </div>
                        <div className="nft-price3">{prize[index]} USHD</div>
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

           
          </div>

          <div className="total-amount3">
            <div className="amount-wrapper3">
              <div className="amount-label3">
                현재 지갑의 교환 금액 총합:
              </div>
              <div className="amount-value3">{sum} USHD</div>
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
          {isInValidEmail && <div className="warning2">유효하지 않은 이메일입니다.</div>}
          <button type="submit" className="submit-button2">USHD 수량 확인하기</button>
        </form>
      </section>
      </>

            
  );
};

export default MApp;