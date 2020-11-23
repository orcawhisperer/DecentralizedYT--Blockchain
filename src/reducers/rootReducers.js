import { combineReducers } from "redux"

import commonReducer from "./commonReducer"

const rootReducer = combineReducers({
   common: commonReducer,
})
export default rootReducer
