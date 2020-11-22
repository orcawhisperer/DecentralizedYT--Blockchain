import React from "react"
import SideBarItem from "./SideBarItem/SideBarItem"
import { Menu, Divider } from "semantic-ui-react"
import { connect } from "react-redux"
import "./SideBar.scss"
import { routes } from "../../../containers/routes/routes"

// import { Subscriptions } from "./Subscriptions/Subscriptions";
// import { SideBarFooter } from "./SideBarFooter/SideBarFooter";
class SideBar extends React.Component {
   render() {
      if (true) {
         return (
            <div className="parent">
               <div
                  className={
                     (this.props.common.isSideBarHidden ? "small-side " : "") +
                     "side"
                  }
               >
                  <Menu
                     fixed="left"
                     borderless
                     className={
                        (this.props.common.isSideBarHidden
                           ? "small-side"
                           : "") + " side"
                     }
                     vertical
                     inverted={this.props.common.isDarkModeActive}
                  >
                     <SideBarItem path="/" label="Home" icon="home" />
                     <Divider />
                     <SideBarItem
                        path={routes.videos.trending}
                        label="Trending"
                        icon="fire"
                     />
                     <Divider />
                     <SideBarItem
                        path={routes.videos.upload}
                        label="Upload"
                        icon="cloud upload"
                     />
                     <Divider />
                  </Menu>
               </div>
               <div
                  className={
                     (this.props.common.isSideBarHidden
                        ? "small-content "
                        : "") + "large-content"
                  }
                  style={
                     this.props.common.isDarkModeActive
                        ? { backgroundColor: "#000" }
                        : { backgroundColor: "#f1f4f5" }
                  }
               >
                  {this.props.children}
               </div>
            </div>
         )
      } else {
         return <div>{this.props.children}</div>
      }
   }
}

export const mapStateToProps = state => {
    return {
      common: state.common,
    }
  }
  
  export default connect(mapStateToProps, null)(SideBar)
