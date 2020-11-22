import React from "react"
import { Menu } from "semantic-ui-react"
import "./SideBarItem.scss"
import { Link, withRouter } from "react-router-dom"
import SideBarItemTextIcon from "./SideBarItemTextIcon/SideBarItemTextIcon"
import { routes } from "../../../../containers/routes/routes"
import { commonActions } from "../../../../actions/commonActions"

import { connect } from "react-redux"
import { compose } from "redux"

export class SideBarItem extends React.Component {
   render() {
      // React will ignore custom boolean attributes, therefore we pass a string
      // we use this attribute in our SCSS for styling
      const highlight = this.shouldBeHighlighted() ? "highlight-item" : null
      return (
         <Menu.Item
            //link={false}
            as={Link}
            to={{ pathname: this.props.path }}
            className={["sidebar-item", highlight].join(" ")}
            // active
            // onClick={this.props.toggleSideBar}
         >
            <SideBarItemTextIcon
               hideText={this.props.common.isSideBarHidden}
               color="grey"
               name={this.props.icon}
            >
               {this.props.label}
            </SideBarItemTextIcon>
         </Menu.Item>
      )
   }

   shouldBeHighlighted() {
      const { pathname } = this.props.location
      if (this.props.path === "/") {
         return pathname === this.props.path
      }
      return pathname.includes(this.props.path)
   }
}

const mapStateToProps = (state) => {
    return {
       common: state.common,
    }
 }
 const createActions = {
    toggleSideBar: commonActions.toggleSideBar,
 }
 export default compose(
    withRouter,
    connect(mapStateToProps, createActions)
 )(SideBarItem)