const initilization = {
   isDarkModeActive: false,
   buffer: null,
   account: "",
   dvideo: null,
   videos: [],
   loading: false,
   currentHash: null,
   currentTitle: null,
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
         state = {
            ...state,
            currentHash: action.hash,
            currentTitle: action.title,
         }
         break
      default:
         break
   }
   return state
}
