import React, { useEffect } from 'react';
import App from '../App.tsx'
import '../index.css'
import { SolanaContext } from '../SolanaContext.tsx'
import Navbar from '../Navigator/Nav.tsx';
import Event from '../event/event.tsx';
import Gallery from '../event/gallery.tsx';
import { Footer } from '../footer/Footer.tsx';
import { MFooter} from '../mobile/footer/MFooter.tsx'
import {Mheader} from '../mobile/Mheader/Mheader.tsx'
import {useDeviceType} from '../useDeviceType.tsx'
import MApp from '../mobile/MApp.tsx';


const MobileComponent: React.FC = () => {
    
    return ( 
        <div className="event-container">
            <div className="event-wrapper">
            <Mheader />
            <MApp />
            <MFooter />
            </div>
        </div>
    )

}

const WalletSection: React.FC = () => {

    const isMobile = useDeviceType();

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent): void => {
          event.preventDefault();
          let dbName = "WALLET_CONNECT_V2_INDEXED_DB";
          const request = window.indexedDB.deleteDatabase(dbName);
          event.returnValue = ""; // 브라우저 기본 메시지 표시
        };
    
        // beforeunload 이벤트 리스너 등록
        window.addEventListener("beforeunload", handleBeforeUnload);
    
        return () => {
          // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
          window.removeEventListener("beforeunload", handleBeforeUnload);
        };
      }, []);


    return isMobile ? (
         <MobileComponent />
    ): (
        <SolanaContext>
        <Navbar />
        <Event />
        <Gallery />
        <App />
        <Footer />
        </SolanaContext>   
    );
};

export default WalletSection;