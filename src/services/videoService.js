import DVideo from "../abis/DVideo.json"
import { appHelperFunctions } from "../helpers/appHelper"

const loadBlockchainData = async () => {
   const web3 = appHelperFunctions.getWeb3Client()

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
         videos: videos,
         currentTitle: latest.title,
         currentHash: latest.hash,
      }
   } else {
      window.alert("DVideo contract not deployed to detected network.")
      return { error: "DVideo contract not deployed to detected network." }
   }
}

export const videoServiceActions = {
   loadBlockchainData,
}
