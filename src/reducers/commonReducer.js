const initilization = {
   isSideBarOpen: false,
}
export default function commonReducer(state = initilization, action) {
   switch (action.type) {
      case "TOGGLE_SIDEBAR":
         state = {
            ...state,
            isSideBarOpen: !state.isSideBarOpen,
         }
         break
      case "SET_DATA":
         state = {
            ...state,
            [action.key]: action.value,
         }
         break
      default:
         break
   }
   return state
}
