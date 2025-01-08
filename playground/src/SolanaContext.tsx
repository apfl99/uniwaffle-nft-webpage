/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, useMemo, useState } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css'
import { WalletConnectWalletAdapter } from '@walletconnect/solana-adapter'

const toggleNetwork = (network: Networks) =>
	network === WalletAdapterNetwork.Devnet ? WalletAdapterNetwork.Mainnet : WalletAdapterNetwork.Devnet

type Networks = WalletAdapterNetwork.Devnet | WalletAdapterNetwork.Mainnet

export const SolanaContext = ({ children }: { children: ReactNode }) => {
	const [currentNetwork, setCurrentNetwork] = useState<Networks>(WalletAdapterNetwork.Mainnet)

	const endpoint = "https://light-attentive-shard.solana-mainnet.quiknode.pro/f1142f0a6bb80c1945b9ed175b3c9f1a4cda8d92"

	const wallets = useMemo(
		() => [
			new WalletConnectWalletAdapter({
				network: currentNetwork,
				options: {
					projectId: 'bd4997ce3ede37c95770ba10a3804dad',
				},
			}),
		],
		[currentNetwork],
	)

	return (
		<ConnectionProvider endpoint={endpoint}>
			<WalletProvider wallets={wallets} autoConnect>
				<WalletModalProvider>
					{children}
				</WalletModalProvider>
			</WalletProvider>
		</ConnectionProvider>
	)
}
