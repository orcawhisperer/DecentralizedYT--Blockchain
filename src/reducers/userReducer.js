const initilization = {
   isWeb3Available: false,
   account: "",
}
export default function userReduer(state = initilization, action) {
   switch (action.type) {
      case "SET_USER_DATA":
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
