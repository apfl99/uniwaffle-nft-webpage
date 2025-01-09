var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AssetUtil, ConnectionController, EventsController, ThemeController } from '@web3modal/core';
import { customElement } from '@web3modal/ui';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { W3mConnectingWidget } from '../../utils/w3m-connecting-widget/index.js';
import styles from './styles.js';
let W3mConnectingWcQrcode = class W3mConnectingWcQrcode extends W3mConnectingWidget {
    constructor() {
        super();
        this.forceUpdate = () => {
            this.requestUpdate();
        };
        window.addEventListener('resize', this.forceUpdate);
        EventsController.sendEvent({
            type: 'track',
            event: 'SELECT_WALLET',
            properties: { name: this.wallet?.name ?? 'WalletConnect', platform: 'qrcode' }
        });
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('resize', this.forceUpdate);
    }
    render() {
        this.onRenderProxy();
        return html `
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${['0', 'xl', 'xl', 'xl']}
        gap="xl"
      >
        <wui-shimmer borderRadius="l" width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>

        <wui-text variant="paragraph-500" color="fg-100">
          Scan this QR Code with your phone
        </wui-text>
        ${this.copyTemplate()}
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `;
    }
    onRenderProxy() {
        if (!this.ready && this.uri) {
            this.timeout = setTimeout(() => {
                this.ready = true;
            }, 0);
        }
    }
    qrCodeTemplate() {
        this.wallet = {"id":"4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0","name":"UniWaffle","homepage":"https://trustwallet.com/","image_id":"3386dde1-8b24-48c8-4b81-16979e342000","order":20,"mobile_link":"trust://","desktop_link":null,"link_mode":null,"webapp_link":null,"app_store":"https://apps.apple.com/app/apple-store/id1288339409","play_store":"https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp","rdns":"com.trustwallet.app","chrome_store":"https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph","injected":[{"namespace":"eip155","injected_id":"isTrust"},{"namespace":"eip155","injected_id":"isTrustWallet"}],"chains":["cosmos:cosmoshub-4","cosmos:kava-4","cosmos:thorchain-mainnet-v1","eip155:1","eip155:10","eip155:100","eip155:108","eip155:1101","eip155:128","eip155:137","eip155:2020","eip155:288","eip155:321","eip155:324","eip155:361","eip155:42161","eip155:42220","eip155:43114","eip155:4689","eip155:56","eip155:56288","eip155:59144","eip155:60","eip155:80084","eip155:80085","eip155:820","eip155:88","eip155:9001","solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp"],"categories":["b7c081de-c6d6-447e-ada6-a6f8e6e1480a","e127a2ef-09e5-417b-9304-3e2e567a0f87"],"description":"Trust Wallet supports over 10 Million tokens including Ethereum, Solana, Polygon Matic, BNB, and Avalanche.","badge_type":"certified","installed":false}
        const tmp = "https://cdn.discordapp.com/attachments/1326744308350718045/1326755236697608262/appicon-512.png?ex=6780949a&is=677f431a&hm=f1926aa7d91d01c13a98d6cc5e5f5726c304b918e9ff0af25e5b1afdf006a51a&"

      
        if (!this.uri || !this.ready) {
            return null;
        }
        const size = this.getBoundingClientRect().width - 40;
        const alt = this.wallet ? this.wallet.name : undefined;
        ConnectionController.setWcLinking(undefined);
        ConnectionController.setRecentWallet(this.wallet);
        return html ` <wui-qr-code
      size=${size}
      theme=${ThemeController.state.themeMode}
      uri=${this.uri}
      imageSrc=${tmp}
      alt=${ifDefined(alt)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`;
    }
    copyTemplate() {
        const inactive = !this.uri || !this.ready;
        return html `<wui-link
      .disabled=${inactive}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`;
    }
};
W3mConnectingWcQrcode.styles = styles;
W3mConnectingWcQrcode = __decorate([
    customElement('w3m-connecting-wc-qrcode')
], W3mConnectingWcQrcode);
export { W3mConnectingWcQrcode };
//# sourceMappingURL=index.js.map