require("babel-register")
require("babel-polyfill")

const HDWalletProvider = require("@truffle/hdwallet-provider")
require("dotenv").config()
const { REACT_APP_API_URL, REACT_APP_MNEMONIC } = process.env

module.exports = {
   networks: {
      development: {
         host: "127.0.0.1",
         port: 7545,
         network_id: "*", // Match any network id
      },
      rinkeby: {
         provider: function () {
            return new HDWalletProvider(REACT_APP_MNEMONIC, REACT_APP_API_URL)
         },
         network_id: "*",
         gas: 5000000,
         gasPrice: 25000000000,
      },
   },
   contracts_directory: "./src/contracts/",
   contracts_build_directory: "./src/abis/",
   compilers: {
      solc: {
         optimizer: {
            enabled: true,
            runs: 200,
         },
      },
   },
}
