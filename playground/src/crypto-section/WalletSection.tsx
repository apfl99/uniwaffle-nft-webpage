import React from 'react';
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