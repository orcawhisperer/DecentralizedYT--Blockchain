import React, { Component } from "react"
import { Route, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import DVideo from "../abis/DVideo.json"
import Main from "./Main"
import "./App.scss"
import { AppLayout } from "./imports/AppLayout"
import { commonActions } from "../actions/commonActions"
import { VideoUpload } from "./VideoUpload"
import Home from "./Home"

class App extends Component {
   componentWillMount() {
      this.props.initApp()
      this.props.loadData()
   }

   //Change Video
   changeVideo = (hash, title) => {
      this.setState({
         currentHash: hash,
         currentTitle: title,
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
      return (
         <AppLayout
            account={this.state.account}
            currentHash={this.state.currentHash}
         >
            <Route
               exact
               path="/"
               component={() => (
                  <Home
                     loading={this.state.loading}
                     currentHash={this.state.currentHash}
                     currentTitle={this.state.currentTitle}
                     videos={this.state.videos}
                     changeVideo={this.changeVideo}
                  />
               )}
            />

            <Route
               exact
               path="/video"
               component={() => (
                  <Main
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
      )
   }
}

const mapStateToProps = (state) => {
   return {
      common: state.common,
   }
}

const actions = {
   initApp: commonActions.initializeApp,
   loadData: commonActions.loadBlockchainData,
}

export default withRouter(connect(mapStateToProps, actions)(App))
