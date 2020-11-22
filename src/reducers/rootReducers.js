import { combineReducers } from "redux"

import commonReducer from "./commonReducer"

// import storage from "redux-persist/lib/storage" // defaults to localStorage for web
// import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2"
// import { persistReducer, createMigrate } from "redux-persist"
// import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel2"
// import hardSet from "redux-persist/lib/stateReconciler/hardSet"





const rootReducer = combineReducers({
   common: commonReducer,
})
export default rootReducer
