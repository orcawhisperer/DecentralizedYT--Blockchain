import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import "semantic-ui-css/semantic.min.css"
import { Provider } from "react-redux"
import IpfsRouter from "ipfs-react-router"
// import { PersistGate } from "redux-persist/integration/react"
import { store } from "./helpers/store"
import * as serviceWorker from "./serviceWorker"
import "./index.css"

ReactDOM.render(
   <Provider store={store}>
      <IpfsRouter>
         <App />
      </IpfsRouter>
   </Provider>,
   document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
