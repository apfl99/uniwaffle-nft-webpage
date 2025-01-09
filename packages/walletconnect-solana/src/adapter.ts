import {
	WalletConnectChainID,
	WalletConnectWallet,
	type WalletConnectWalletAdapterConfig as BaseWalletConnectWalletAdapterConfig,
} from './core.js'
import type { WalletError, WalletName } from '@solana/wallet-adapter-base'
import {
	BaseSignerWalletAdapter,
	WalletAdapterNetwork,
	WalletDisconnectionError,
	WalletNotConnectedError,
	WalletNotReadyError,
	WalletReadyState,
	WalletSignMessageError,
	WalletSignTransactionError,
	WalletWindowClosedError,
} from '@solana/wallet-adapter-base'
import type { PublicKey, Transaction, TransactionVersion, VersionedTransaction } from '@solana/web3.js'

export const WalletConnectWalletName = 'Uniwaffle' as WalletName<'WalletConnect'>

export type WalletConnectWalletAdapterConfig = {
	network: WalletAdapterNetwork.Mainnet | WalletAdapterNetwork.Devnet
} & Pick<BaseWalletConnectWalletAdapterConfig, 'options'>

export class WalletConnectWalletAdapter extends BaseSignerWalletAdapter {
	name = WalletConnectWalletName
	url = 'https://walletconnect.org'
	icon =
		'https://bsp.ltcwareko.com/getImage?img=icon_uniwaffle.png'
	// V0 transactions are supported via the `transaction` parameter, and is off-spec.
	// Legacy transactions have these [parameters](https://docs.walletconnect.com/2.0/advanced/rpc-reference/solana-rpc#solana_signtransaction)
	readonly supportedTransactionVersions: ReadonlySet<TransactionVersion> = new Set(['legacy', 0])

	private _publicKey: PublicKey | null
	private _connecting: boolean
	private _wallet: WalletConnectWallet
	private _config: WalletConnectWalletAdapterConfig
	private _readyState: WalletReadyState =
		typeof window === 'undefined' ? WalletReadyState.Unsupported : WalletReadyState.Loadable

	private _onDisconnect: WalletConnectWalletAdapter['disconnect'] | undefined

	constructor(config: WalletConnectWalletAdapterConfig) {
		super()

		this._publicKey = null
		this._connecting = false
		this._config = config
		this._wallet = new WalletConnectWallet({
			network:
				this._config.network === WalletAdapterNetwork.Mainnet
					? WalletConnectChainID.Mainnet
					: WalletConnectChainID.Devnet,
			options: this._config.options,
		})

		this._onDisconnect = this.disconnect.bind(this)
	}

	get publicKey() {
		return this._publicKey
	}

	get connecting() {
		return this._connecting
	}

	get readyState() {
		return this._readyState
	}

	async connect(): Promise<void> {
		try {
			if (this.connected || this.connecting) return
			if (this._readyState !== WalletReadyState.Loadable) throw new WalletNotReadyError()

			this._connecting = true

			const { publicKey } = await this._wallet.connect()
			this._publicKey = publicKey
			this.emit('connect', publicKey)
			this._wallet.client.on('session_delete', this._onDisconnect)
		} catch (error: unknown) {
			if ((error as Error).constructor.name === 'QRCodeModalError') throw new WalletWindowClosedError()
			throw error
		} finally {
			this._connecting = false
		}
	}

	async disconnect(): Promise<void> {
		const wallet = this._wallet
		if (wallet) {
			wallet.client.off('session_delete', this._onDisconnect)
			this._publicKey = null

			try {
				if (wallet.client.session) {
					await wallet.disconnect()
				}
			} catch (error: unknown) {
				this.emit('error', new WalletDisconnectionError((error as Error)?.message, error))
			}
		}

		this.emit('disconnect')
	}

	async signTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<T> {
		try {
			const wallet = this._wallet
			if (!wallet) throw new WalletNotConnectedError()

			try {
				return (await wallet.signTransaction(transaction)) as T
			} catch (error: unknown) {
				throw new WalletSignTransactionError((error as Error)?.message, error)
			}
		} catch (error: unknown) {
			this.emit('error', error as WalletError)
			throw error
		}
	}

	async signMessage(message: Uint8Array): Promise<Uint8Array> {
		try {
			const wallet = this._wallet
			if (!wallet) throw new WalletNotConnectedError()

			try {
				return await wallet.signMessage(message)
			} catch (error: unknown) {
				throw new WalletSignMessageError((error as Error)?.message, error)
			}
		} catch (error: unknown) {
			this.emit('error', error as WalletError)
			throw error
		}
	}

	async signAndSendTransaction<T extends Transaction | VersionedTransaction>(transaction: T): Promise<string> {
		try {
			const wallet = this._wallet
			if (!wallet) throw new WalletNotConnectedError()

			try {
				return await wallet.signAndSendTransaction(transaction)
			} catch (error: unknown) {
				throw new WalletSignTransactionError((error as Error)?.message, error)
			}
		} catch (error: unknown) {
			this.emit('error', error as WalletError)
			throw error
		}
	}

	async signAllTransactions<T extends Transaction | VersionedTransaction>(transactions: T[]): Promise<T[]> {
		try {
			const wallet = this._wallet
			if (!wallet) throw new WalletNotConnectedError()

			try {
				return await wallet.signAllTransactions(transactions)
			} catch (error: unknown) {
				throw new WalletSignTransactionError((error as Error)?.message, error)
			}
		} catch (error: unknown) {
			this.emit('error', error as WalletError)
			throw error
		}
	}
}
