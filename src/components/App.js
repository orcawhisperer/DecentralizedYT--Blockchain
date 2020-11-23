import React, { Component } from "react"
import { Route, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import DVideo from "../abis/DVideo.json"
import Navbar from "./Navbar"
import Main from "./Main"
import Web3 from "web3"
import "./App.scss"
import { AppLayout } from "./imports/AppLayout"
import { commonActions } from "../actions/commonActions"
import { VideoUpload } from "./VideoUpload"

//Declare IPFS
const ipfsClient = require("ipfs-http-client")
const ipfs = ipfsClient({
   host: process.env.REACT_APP_IPFS_HOST,
   port: process.env.REACT_APP_IPFS_PORT,
   protocol: process.env.REACT_APP_IPFS_PROTOCOL,
}) // leaving out the arguments will default to these values

class App extends Component {
   async componentWillMount() {
      await this.loadWeb3()
      await this.loadBlockchainData()
      //  this.props.initializeApp()
   }

   async loadWeb3() {
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

   async loadBlockchainData() {
      const web3 = window.web3
      console.log(web3)
      //Load accounts
      const accounts = await web3.eth.getAccounts()
      console.log(accounts)
      //Add first account the the state
      this.setState({
         account: accounts[0],
      })

      //Get network ID
      const networkId = await web3.eth.net.getId()
      //Get network data
      const networkData = DVideo.networks[networkId]
      //Check if net data exists, then
      if (networkData) {
         const dvideo = new web3.eth.Contract(DVideo.abi, networkData.address)
         this.setState({
            dvideo: dvideo,
         })

         const videoCount = await dvideo.methods.videoCount().call()
         this.setState({ videoCount: videoCount })

         //Load videos, sort by newest
         for (let i = videoCount; i >= 1; i--) {
            const video = await dvideo.methods.videos(i).call()
            this.setState({
               videos: [...this.state.videos, video],
            })
         }

         //Set latest video with title to view as default
         const latest = await dvideo.methods.videos(videoCount).call()
         this.setState({
            currentHash: latest.hash,
            currentTitle: latest.title,
         })
         this.setState({
            loading: false,
         })
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

   //Get video
   captureFile = (event, title) => {
      console.log(title)
      event.preventDefault()
      const file = event.target.files[0]
      const reader = new window.FileReader()
      reader.readAsArrayBuffer(file)

      reader.onloadend = () => {
         this.setState({
            title: title,
            buffer: Buffer(reader.result),
         })
         console.log("buffer", this.state.buffer)
      }
   }

   //Upload video
   uploadVideo = () => {
      console.log("Submitting to IPFS....")

      //Add to IPFS
      ipfs.add(this.state.buffer, (err, result) => {
         console.log("IPFS result", result)
         if (err) {
            console.error(err)
            return
         }

         this.setState({ loading: true })

         // Put on blockchain
         this.state.dvideo.methods
            .uploadVideo(result[0].hash, this.state.title)
            .send({ from: this.state.account })
            .on("transactionHash", (hash) => {
               this.setState({ loading: false })
            })
      })
   }

   //Change Video
   changeVideo = (hash, title) => {
      this.setState({
         currentHash: hash,
         title: title,
      })
   }

   constructor(props) {
      super(props)
      this.state = {
         buffer: null,
         account: "",
         dvideo: null,
         videos: [],
         loading: true,
         currentHash: null,
         currentTitle: null,
         //set states
      }

      //Bind functions
   }

   render() {
      console.log(this.state.videos)
      return (
         <AppLayout
            account={this.state.account}
            currentHash={this.state.currentHash}
         >
            <Route
               exact
               path="/watch"
               component={() => (
                  <Main
                     captureFile={this.captureFile}
                     uploadVideo={this.uploadVideo}
                     currentHash={this.state.currentHash}
                     currentTitle={this.state.currentTitle}
                     videos={this.state.videos}
                     changeVideo={this.changeVideo}
                  />
               )}
            />
            <Route
               exact
               path="/video/upload"
               component={() => (
                  <VideoUpload
                     title={this.state.title}
                     buffer={this.state.buffer}
                     captureFile={this.captureFile}
                     uploadVideo={this.uploadVideo}
                  />
               )}
            />
         </AppLayout>
         // <div>
         //    <Navbar account={this.state.account} />
         //    {this.state.loading ? (
         //       <div id="loader" className="text-center mt-5">
         //          <p>Loading...</p>
         //       </div>
         //    ) : (
         //       <Main
         //          //states&functions
         //          captureFile={this.captureFile}
         //          uploadVideo={this.uploadVideo}
         //          currentHash={this.state.currentHash}
         //          currentTitle={this.state.currentTitle}
         //       />
         //    )}
         // </div>
      )
   }
}

const mapStateToProps = (state) => {
   return {
      common: state.common,
   }
}

const actions = {
   initializeApp: commonActions.initializeApp,
}

export default withRouter(connect(mapStateToProps, actions)(App))
