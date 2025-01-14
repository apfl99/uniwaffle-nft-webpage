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
        const handleUnload = () => {
          console.log("창이 닫히거나 떠날 때 실행");
          let dbName = "WALLET_CONNECT_V2_INDEXED_DB";
          const request = window.indexedDB.deleteDatabase(dbName);
        };
    
        window.addEventListener("unload", handleUnload);
    
        return () => {
          window.removeEventListener("unload", handleUnload);
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