import { combineReducers } from "redux"
import userReduer from "./userReducer"
import videoReducer from "./videoReducer"
import commonReducer from "./commonReducer"

const rootReducer = combineReducers({
   video: videoReducer,
   user: userReduer,
   common: commonReducer,
})
export default rootReducer
