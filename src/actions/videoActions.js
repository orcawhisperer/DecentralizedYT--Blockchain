import { videoServiceActions } from "../services/videoService"

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

const loadBlockchainData = () => {
   console.log("load blockchain called...")
   return (dispatch) => {
      dispatch(setData("loading", true))
      videoServiceActions.loadBlockchainData().then((data) => {
         // dispatch(setData("account", data.account))
         dispatch(setData("dvideo", data.dvideo))
         dispatch(setData("videos", data.videos))
         // dispatch(setData("currentTitle", data.currentTitle))
         // dispatch(setData("currentHash", data.currentHash))
         dispatch(setData("loading", false))
      })
   }
   // initApp.loadBlockchainData()
}

const getVideo = (videoHash, videos) => {
   return (dispatch) => {
      dispatch(setData("isVideoLoading", true))
      dispatch(
         setData("currentVideo", {
            metadata: {
               video: "",
               thumbnail: "",
            },
         })
      )
      if (videos && videos.length > 0) {
         let video = videos.filter((video) => {
            return video.hash === videoHash
         })
         if (video && video.hash) {
            dispatch(setData("currentVideo", video))
         } else {
            videoServiceActions.fetchVideo(videoHash).then((data) => {
               if (data.error) {
                  dispatch(setData("isVideoNotFound", true))
                  dispatch(setData("isVideoLoading", false))
                  dispatch(
                     setData("currentVideo", {
                        metadata: {
                           video: "",
                           thumbnail: "",
                        },
                     })
                  )
               } else {
                  dispatch(setData("currentVideo", data))
                  dispatch(setData("isVideoNotFound", false))
                  dispatch(setData("isVideoLoading", false))
               }
            })
         }
      } else {
         videoServiceActions.fetchVideo(videoHash).then((data) => {
            if (data.error) {
               dispatch(setData("isVideoNotFound", true))
               dispatch(
                  setData("currentVideo", {
                     metadata: {
                        video: "",
                        thumbnail: "",
                     },
                  })
               )
               dispatch(setData("isVideoLoading", false))
            } else {
               dispatch(setData("currentVideo", data))
               dispatch(setData("isVideoNotFound", false))
               dispatch(setData("isVideoLoading", false))
            }
         })
      }
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
const changeVideo = (id) => {
   return {
      type: "CHANGE_VIDEO",
      id: id,
   }
}

export const videoActions = {
   setData,
   appendData,
   loadBlockchainData,
   updateApp,
   changeVideo,
   getVideo,
}
