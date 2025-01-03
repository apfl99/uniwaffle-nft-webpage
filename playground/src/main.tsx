import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import WalletSection from './crypto-section/WalletSection.tsx'

import { Buffer } from 'buffer'

if (typeof window !== 'undefined' && window.Buffer === undefined) {
	window.Buffer = Buffer
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<WalletSection />
	</React.StrictMode>,
)
