import { combineReducers } from "redux"

import videoReducer from "./videoReducer"
import commonReducer from "./commonReducer"

const rootReducer = combineReducers({
   video: videoReducer,
   common: commonReducer,
})
export default rootReducer
