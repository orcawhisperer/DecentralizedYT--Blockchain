import DVideo from "../abis/DVideo.json"
import Web3 from "web3"
import { commonActions } from "../actions/commonActions"

const ipfsClient = require("ipfs-http-client")

const getIPFSClient = () => {
   return ipfsClient({
      host: process.env.IPFS_HOST,
      port: process.env.IPFS_PORT,
      protocol: process.env.IPFS_PROTOCOL,
   })
}

const loadWeb3 = async () => {
   if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
   } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
   } else {
      window.alert(
         "Non-Ethereum browser detected. You should consider trying MetaMask!"
      )
   }
}

const loadBlockchainData = async () => {
   const web3 = window.web3
   console.log(web3)
   //Load accounts
   const accounts = await web3.eth.getAccounts()
   console.log(accounts)
   //Add first account the the state
   commonActions.setData("account", accounts[0])

   //Get network ID
   const networkId = await web3.eth.net.getId()
   //Get network data
   const networkData = DVideo.networks[networkId]
   //Check if net data exists, then
   if (networkData) {
      const dvideo = new web3.eth.Contract(DVideo.abi, networkData.address)
      commonActions.setData("dvideo", dvideo)

      const videoCount = await dvideo.methods.videoCount().call()
      commonActions.setData("videoCount", videoCount)

      //Load videos, sort by newest
      let videos = []
      for (let i = videoCount; i >= 1; i--) {
         const video = dvideo.methods.videos(i).call()
         videos = [...videos, video]
      }

      //Set latest video with title to view as default
      const latest = await dvideo.methods.videos(videoCount).call()
      commonActions.setData("currentHash", latest.hash)
      commonActions.setData("currentTitle", latest.title)
      commonActions.setData("loading", false)

      return (dispatch) => {
         dispatch(
            commonActions.updateApp({
               account: accounts[0],
               videoCount: videoCount,
               dvideo: dvideo,
               videos: videos,
               currentHash: latest.currentHash,
               title: latest.title,
            })
         )
      }
   } else {
      window.alert("DVideo contract not deployed to detected network.")
   }

   //Assign dvideo contract to a variable
   //Add dvideo to the state

   //Check videoAmounts
   //Add videAmounts to the state

   //Iterate throught videos and add them to the state (by newest)

   //Set latest video and it's title to view as default
   //Set loading state to false

   //If network data doesn't exisits, log error
}

export const initApp = {
   loadWeb3,
   loadBlockchainData,
   getIPFSClient,
}
