const ipfsClient = require("ipfs-http-client")

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")

const getWeb3Client = () => {
   const web3 = createAlchemyWeb3(
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

export const appHelperFunctions = {
   getIPFSClient,
   getWeb3Client,
}
