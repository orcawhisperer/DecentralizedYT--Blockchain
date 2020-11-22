import React from "react"
import { Icon, Label, Menu, Image, Divider, Header } from "semantic-ui-react"
import Identicon from "identicon.js"
import { Badge } from "antd"
import { NotificationOutlined } from "@ant-design/icons"
import { commonActions } from "../../../actions/commonActions"
import { compose } from "redux"
import { connect } from "react-redux"
import "./HeaderNav.scss"
import { withRouter } from "react-router-dom"

class HeaderNav extends React.Component {
   render() {
      return (
         <Menu
            fixed="top"
            className="top-menu"
            //inverted={this.props.common.isDarkModeActive}
         >
            <Menu.Item
               className={
                  (this.props.common.isSideBarHidden ? "small-side" : "") +
                  " side"
               }
            >
               <Image
                  src={
                     "https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg"
                  }
                  style={{ height: "100%" }}
               ></Image>
               {/* <div
              hidden={this.props.common.isSideBarHidden}
              style={{ marginLeft: "2%" }}
            ></div> */}
               <Header
                  hidden={this.props.common.isSideBarHidden}
                  inverted={this.props.common.isDarkModeActive}
                  style={{ marginLeft: "4%", marginTop: "2%" }}
               >
                  DYT
               </Header>
            </Menu.Item>

            <Divider vertical></Divider>

            <Menu.Item header className="logo">
               <Icon
                  name="bars"
                  size="big"
                  onClick={this.props.toggleSideBar}
               ></Icon>
            </Menu.Item>

            <Menu.Menu className="nav-container">
               <Menu.Menu position="right">
                  <Menu.Item as="a" onClick={this.props.toggleRightSideBar}>
                     {this.props.isNewNotificationActive ? (
                        <Badge dot>
                           <NotificationOutlined style={{ fontSize: "16px" }} />
                        </Badge>
                     ) : (
                        <NotificationOutlined style={{ fontSize: "16px" }} />
                     )}
                  </Menu.Item>

                  <Menu.Item>
                     {this.props.account ? (
                        <img
                           className="ml-2"
                           width="30"
                           height="30"
                           src={`data:image/png;base64,${new Identicon(
                              this.props.account,
                              30
                           ).toString()}`}
                           alt=""
                        />
                     ) : (
                        <Icon
                           className="header-icon"
                           name="Sign up"
                           size="large"
                           onClick={() => {
                              //   this.props.setInitalState()
                              //   this.props.logout()
                           }}
                        />
                     )}
                  </Menu.Item>
               </Menu.Menu>
            </Menu.Menu>
         </Menu>
      )
   }

   componentDidMount() {}
}

const mapStateToProps = (state) => {
   return {
      common: state.common,
   }
}
const createActions = {
   toggleSideBar: commonActions.toggleSideBar,
   toggleRightSideBar: commonActions.toggleRightSideBar,
}
export default compose(
   withRouter,
   connect(mapStateToProps, createActions)
)(HeaderNav)
