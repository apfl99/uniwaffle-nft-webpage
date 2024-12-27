import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import './App.css'
import { Toaster } from 'react-hot-toast'
import { RequestAirdrop } from './components/RequestAirdrop'
import { SignMessage } from './components/signMessage'
import { SendLegacyTransaction } from './components/SendLegacyTransaction'
import { SignTransaction } from './components/SignTransaction'
import { SendTransaction } from './components/SendTransaction'
import { SendV0Transaction } from './components/SendV0Transaction'
import { Table } from './components/table'

function App() {
	const headers = ['Name', 'Age', 'Country'];
	const data = [
		{ Name: 'Alice', Age: 25, Country: 'USA' },
		{ Name: 'Bob', Age: 30, Country: 'Canada' },
		{ Name: 'Charlie', Age: 35, Country: 'UK' },
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
			<WalletMultiButton />
			<WalletDisconnectButton />
			<Toaster />

			{/* Wallet Interaction */}
			<SignMessage />
			<SignTransaction />
			<SendTransaction />
			<SendV0Transaction />
			<SendLegacyTransaction />
			<RequestAirdrop />
			<Table headers={headers} data={data}/>
		</div>
	)
}

export default App
