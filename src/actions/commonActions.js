import { initApp } from "../services/init"

const toggleSideBar = () => {
   return {
      type: "TOGGLE_SIDEBAR",
   }
}

const setData = (key, value) => {
   return {
      type: "SET_DATA",
      key: key,
      value: value,
   }
}

const appendData = (key, value) => {
   return {
      type: "APPEND_DATA",
      key: key,
      value: value,
   }
}

const initializeApp = () => {
   return (dispatch) => {
      initApp
         .loadWeb3()
         .then((data) => {
            dispatch(setData("WEB3_INITIALIZED", true))
         })
         .catch((reason) => {
            dispatch(setData("WEB3_INITIALIZED", false))
         })
   }
   // initApp.loadBlockchainData()
}

const loadBlockchainData = () => {
   return (dispatch) => {
      initApp.loadBlockchainData().then((data) => {
         dispatch(setData("account", data.account))
         dispatch(setData("dvideo", data.dvideo))
         dispatch(setData("videos", data.videos))
         dispatch(setData("currentTitle", data.currentTitle))
         dispatch(setData("currentHash", data.currentTitle))
         dispatch(setData("loading", false))
      })
   }
   // initApp.loadBlockchainData()
}

const updateApp = (data) => {
   return (dispatch) => {
      for (let key in data) {
         dispatch(setData(key, data[key]))
      }
   }
}

export const commonActions = {
   toggleSideBar,
   setData,
   appendData,
   initializeApp,
   loadBlockchainData,
   updateApp,
}
