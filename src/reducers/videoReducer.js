const initilization = {
   isDarkModeActive: false,
   buffer: null,
   account: "",
   dvideo: null,
   videos: [],
   loading: false,
   currentHash: null,
   currentTitle: null,
   currentVideo: {
      metadata: {
         video: "",
         thumbnail: "",
      },
   },
   isVideoNotFound: false,
   isVideoLoading: false,
   isWeb3Available: true,
}
export default function videoReducer(state = initilization, action) {
   switch (action.type) {
      case "SET_VIDEO_DATA":
         state = {
            ...state,
            [action.key]: action.value,
         }
         break
      case "APPEND_DATA":
         const data = state[action.key]
         state = {
            ...state,
            [action.key]: [...data, action.value],
         }
         break
      case "CHANGE_VIDEO":
         let currentVideo = state.videos.filter((video) => {
            return video.id.toNumber() === action.id.toNumber()
         })
         state = {
            ...state,
            currentVideo: currentVideo[0],
         }
         break
      default:
         break
   }
   return state
}
