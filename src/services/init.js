import DVideo from "../abis/DVideo.json"
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
   "https://eth-rinkeby.alchemyapi.io/v2/wTZV3COMJ4xZ_CaEY8ALqzXXpAhjjB4-"
)

const ipfsClient = require("ipfs-http-client")

const getIPFSClient = () => {
   return ipfsClient({
      host: process.env.REACT_APP_IPFS_HOST,
      port: process.env.REACT_APP_IPFS_PORT,
      protocol: process.env.REACT_APP_IPFS_PROTOCOL,
   })
}

const loadWeb3 = async () => {
   if (window.ethereum) {
      try {
         const accounts = await await window.ethereum.request({
            method: "eth_requestAccounts",
         })
         return accounts
      } catch (error) {
         const err = { error: "Web3 not available" }
         return err
      }
   } else {
      const err = { error: "Web3 not available" }
      return err
      // The user doesn't have Metamask installed.
   }
}

const loadBlockchainData = async () => {
   //Load accounts
   const accounts = await web3.eth.getAccounts()
   // const accounts = await handleResponse(accountsResponse)

   //Get network ID
   const networkId = await web3.eth.net.getId()
   //Get network data
   const networkData = DVideo.networks[networkId]
   //Check if net data exists, then
   if (networkData) {
      const dvideo = web3.eth.Contract(DVideo.abi, networkData.address)

      const videoCount = await dvideo.methods.videoCount().call()

      //Load videos, sort by newest
      let videos = []
      for (let i = videoCount; i >= 1; i--) {
         const video = await dvideo.methods.videos(i).call()
         videos = [...videos, video]
      }

      //Set latest video with title to view as default
      const latest = await dvideo.methods.videos(videoCount).call()

      return {
         dvideo: dvideo,
         account: accounts[0],
         videos: videos,
         currentTitle: latest.title,
         currentHash: latest.hash,
      }
   } else {
      window.alert("DVideo contract not deployed to detected network.")
   }
}

export const initApp = {
   loadWeb3,
   loadBlockchainData,
   getIPFSClient,
}
