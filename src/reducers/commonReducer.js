const initilization = {
    isSideBarHidden: true,
    isDarkModeActive: false,
    buffer: null,
    account: "",
    dvideo: null,
    videos: [],
    loading: true,
    currentHash: null,
    currentTitle: null,
 }
 export default function commonReducer(state = initilization, action) {
    switch (action.type) {
       case "TOGGLE_SIDEBAR":
          state = {
             ...state,
             isSideBarHidden: !state.isSideBarHidden,
          }
          break
        case "SET_DATA":
            state = {
                ...state,
                [action.key]: action.value
            }
            break
        case "APPEND_DATA":
            const data = state[action.key]
            state = {
                ...state,
                [action.key] : [...data, action.value]
            }
            break
       default:
          break
    }
    return state
 }
 