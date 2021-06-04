const HDWalletProvider = require('truffle-hdwallet-provider')
const NonceTrackerSubprovider = require('web3-provider-engine/subproviders/nonce-tracker')
const utils = require('web3-utils')
const mnemonic = "helmet survey verify portion drop gorilla kitten essence spider unveil sniff another"  //MetaMask的助记词。
const infura_token_url = 'https://ropsten.infura.io/v3/f837cc1b46544eb5813256362ed5844b'
const startIndex = 0
const numberOfAccounts = 1
let hdWalletProvider

const setupWallet = (
  url
) => {
  if (!hdWalletProvider) {
      hdWalletProvider = new HDWalletProvider(
          mnemonic,
          url,
          startIndex,
          numberOfAccounts,
    true,
)
      hdWalletProvider.engine.addProvider(new NonceTrackerSubprovider())
  }
  return hdWalletProvider
}

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    aurora: {
      provider: () => setupWallet('https://testnet.aurora.dev'),
      network_id: 0x4e454153,
      gas: 10000000,
      from: '0x256807C23d5085ad22CC124c00852eE60989fC3E'
    },
    ropsten: {
      provider: () => setupWallet(infura_token_url),
      network_id: 0x3,
      from: '0x256807C23d5085ad22CC124c00852eE60989fC3E',
      gas: 8 * 1000000,
      gasPrice: utils.toWei('8', 'gwei')
    }
  },
  compilers: {
    solc: {
      version: "0.6.6",
      settings: {
        optimizer: {
          enabled: true,
          runs: 999999   // Optimize for how many times you intend to run the code
        },
        evmVersion: "istanbul"
      }
    }    
  }
};