const ipfsClient = require("ipfs-http-client")

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")

const getWeb3Client = () => {
   const web3 = createAlchemyWeb3(
      // "https://eth-rinkeby.alchemyapi.io/v2/xVLY-Yuz3DhsCzAL5c3YzRbEbkbyPbCG"
      "https://eth-rinkeby.alchemyapi.io/v2/wTZV3COMJ4xZ_CaEY8ALqzXXpAhjjB4-"
   )
   return web3
}

const getIPFSClient = () => {
   return ipfsClient({
      host: "ipfs.infura.io", //process.env.REACT_APP_IPFS_HOST,
      port: "5001", //process.env.REACT_APP_IPFS_PORT,
      protocol: "https", //process.env.REACT_APP_IPFS_PROTOCOL,
   })
}

const getIPFSData = async (hash) => {
   return fetch(`https://ipfs.infura.io/ipfs/${hash}`)
      .then((response) => response.json())
      .then((data) => {
         return data
      })
      .catch((err) => {
         return {}
      })
}

const covertISOToDateTimeString = (isoDate) => {
   let date = new Date(isoDate)

   let options = { timeZone: "Asia/Kolkata", timeStyle: "short" }
   let timeString = date.toLocaleTimeString("en-US", options)
   let dateString = date.toDateString()
   return timeString + " " + dateString
}

export const appHelperFunctions = {
   getIPFSClient,
   getWeb3Client,
   getIPFSData,
   covertISOToDateTimeString,
}
