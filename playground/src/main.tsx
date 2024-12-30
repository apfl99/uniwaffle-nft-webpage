import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SolanaContext } from './SolanaContext.tsx'
import Navbar from './Navigator/Nav.tsx'
import Event from './event/event.tsx'
import Gallery from './event/gallery.tsx'
import WalletSection from './crypto-section/WalletSection.tsx'

import { Buffer } from 'buffer'

if (typeof window !== 'undefined' && window.Buffer === undefined) {
	window.Buffer = Buffer
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Navbar />
		<Event />
		<Gallery />
		<WalletSection />
	</React.StrictMode>,
)
