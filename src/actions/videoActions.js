import { initApp } from "../services/init"

const setData = (key, value) => {
   return {
      type: "SET_VIDEO_DATA",
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
         dispatch(setData("currentHash", data.currentHash))
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

//Change Video
const changeVideo = (hash, title) => {
   return {
      type: "CHANGE_VIDEO",
      hash: hash,
      title: title,
   }
}

export const videoActions = {
   setData,
   appendData,
   initializeApp,
   loadBlockchainData,
   updateApp,
   changeVideo,
}
