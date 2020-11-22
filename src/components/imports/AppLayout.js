import React from "react"
import "./AppLayout.scss"
import HeaderNav from "./HeaderNav/HeaderNav"
// import ScrollToTop from "../ScrollToTop/ScrollToTop"
import SideBar from "./SideBar/SideBar"
// import NotificationSideBar from "../SideBar/NotificationSideBar"

export function AppLayout(props) {
   return (
      <div id="grid">
         <div className="menu">
            <HeaderNav account={props.account}></HeaderNav>
         </div>
         <div className="main-content">
            <SideBar>{props.children}</SideBar>
            {/* <NotificationSideBar>{props.children}</NotificationSideBar> */}
         </div>
      </div>
   )
}
