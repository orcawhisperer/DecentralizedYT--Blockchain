import React, { Component } from "react"
import { Route, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import Main from "./Main"
import "./App.scss"
import { AppLayout } from "./imports/AppLayout"
import { commonActions } from "../actions/commonActions"
import { VideoUpload } from "./VideoUpload"
import Home from "./Home"

class App extends Component {
   componentDidMount() {
      this.props.initApp()
      this.props.loadData()
   }

   //Change Video
   changeVideo = (hash, title) => {
      this.props.setData("currentHash", hash)
      this.props.setData("currentTitle", title)
   }

   constructor(props) {
      super(props)
      this.state = {
         //set states
      }

      //Bind functions
   }

   render() {
      return (
         <AppLayout
            account={this.props.common.account}
            currentHash={this.props.common.currentHash}
         >
            <Route
               exact
               path="/"
               component={() => (
                  <Home
                     loading={this.props.common.loading}
                     currentHash={this.props.common.currentHash}
                     currentTitle={this.props.common.currentTitle}
                     videos={this.props.common.videos}
                     changeVideo={this.changeVideo}
                  />
               )}
            />

            <Route
               exact
               path="/video"
               component={() => (
                  <Main
                     currentHash={this.props.common.currentHash}
                     currentTitle={this.props.common.currentTitle}
                     videos={this.props.common.videos}
                     changeVideo={this.changeVideo}
                  />
               )}
            />
            <Route
               exact
               path="/video/upload"
               component={() => <VideoUpload />}
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
   setData: commonActions.setData,
   initApp: commonActions.initializeApp,
   loadData: commonActions.loadBlockchainData,
}

export default withRouter(connect(mapStateToProps, actions)(App))
