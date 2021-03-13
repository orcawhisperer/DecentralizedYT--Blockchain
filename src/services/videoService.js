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
         if (
            ![
               "QmSQDooHbWPAsAihLdwf9qhWS6Q8Vr6ezNWr8VK1keTScS",
               "QmdXh5q1dwQzGBpXHNqK9HanRTs4Gf3UWDBdZm5TnfawPm",
               "QmeEw1uSS1SQezKc4srLqbwMyvQNq6ZmNtmoi6yicxHaPx"
            ].includes(video.videoHash)
         ) {
            const metaData = await appHelperFunctions.getIPFSData(
               video.videoHash
            )
            videos = [
               ...videos,
               {
                  id: video.id,
                  hash: video.videoHash,
                  title: video.title,
                  metadata: metaData,
               },
            ]
         }
      }

      //Set latest video with title to view as default
      // const latest = await dvideo.methods.videos(videoCount).call()

      return {
         dvideo: dvideo,
         videos: videos,
      }
   } else {
      window.alert("DVideo contract not deployed to detected network.")
      return { error: "DVideo contract not deployed to detected network." }
   }
}

const fetchVideo = async (videoHash) => {
   const web3 = appHelperFunctions.getWeb3Client()
   //Get network ID
   const networkId = await web3.eth.net.getId()
   //Get network data
   const networkData = DVideo.networks[networkId]

   if (networkData) {
      const contract = web3.eth.Contract(DVideo.abi, networkData.address)
      let data = await contract.methods.getVideo(videoHash).call()
      if (data[0] === "OK") {
         const metaData = await appHelperFunctions.getIPFSData(data[1])
         return {
            hash: data[1],
            metadata: metaData,
         }
      } else {
         return { error: "video not found" }
      }
   }
}

export const videoServiceActions = {
   loadBlockchainData,
   fetchVideo,
}
