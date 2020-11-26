import { userServiceActions } from "../services/userService"

const connectToBlockChain = () => {
   return (dispatch) => {
      userServiceActions
         .setUpUser()
         .then((data) => {
            if (data.error) {
                console.log(data)
               dispatch(setData("isWeb3Available", false))
            } else {
               dispatch(setData("isWeb3Available", true))
               dispatch(setData("account", data[0]))
            }
         })
         .catch((err) => {
            dispatch(setData("isWeb3Available", false))
         })
   }
   // initApp.loadBlockchainData()
}

const setData = (key, value) => {
   return {
      type: "SET_USER_DATA",
      key: key,
      value: value,
   }
}

export const userActions = {
   connectToBlockChain,
   setData,
}
