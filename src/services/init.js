import DVideo from "../abis/DVideo.json"
import { handleResponse } from "../middleware/HandleResponse/handleResponse"
import { commonActions } from "../actions/commonActions"

const API_URL = process.env.REACT_APP_API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const ipfsClient = require("ipfs-http-client")

const getIPFSClient = () => {
   return ipfsClient({
      host: process.env.IPFS_HOST,
      port: process.env.IPFS_PORT,
      protocol: process.env.IPFS_PROTOCOL,
   })
}

const loadWeb3 = () => {
   if (window.ethereum) {
      return window.ethereum
         .enable()
         .then(handleResponse)
         .then((accounts) => {
            // Metamask is ready to go!
            return accounts
         })
   } else {
      // The user doesn't have Metamask installed.
   }
}

const loadBlockchainData = () => {}

export const initApp = {
   loadWeb3,
   loadBlockchainData,
   getIPFSClient,
}
