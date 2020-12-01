import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import "./App.scss"
import AppLayout from "./imports/AppLayout"
import { videoActions } from "../actions/videoActions"
import { appHelperFunctions } from "../helpers/appHelper"
import { values } from "lodash"

class App extends Component {
   componentDidMount() {
      // this.props.initApp()
      this.props.loadData()
   }

   constructor(props) {
      super(props)
      this.state = {
         //set states
      }
      //Bind functions
   }

   render() {
      return <AppLayout />
   }
}

const actions = {
   initApp: videoActions.initializeApp,
   loadData: videoActions.loadBlockchainData,
}

export default withRouter(connect(null, actions)(App))
