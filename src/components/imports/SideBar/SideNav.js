import React from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import HomeIcon from "@material-ui/icons/Home"
import TrendingIcon from "@material-ui/icons/Whatshot"
import UploadIcon from "@material-ui/icons/Publish"
import { commonActions } from "../../../actions/commonActions"

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
   drawer: {
      width: drawerWidth,
      flexShrink: 0,
   },
   drawerPaper: {
      width: drawerWidth,
      marginTop: `4%`,
   },
   sideNavLink: {
      color: `black`,
   },
}))

export const SideNav = () => {
   const classes = useStyles()
   //    const theme = useTheme()
   const isSideBarOpen = useSelector((state) => state.common.isSideBarOpen)
   const dispatch = useDispatch()

   return (
      <Drawer
         className={classes.drawer}
         variant="persistent"
         anchor="left"
         open={isSideBarOpen}
         classes={{
            paper: classes.drawerPaper,
         }}
      >
         <Divider />
         <List>
            <Link
               to="/"
               className={classes.sideNavLink}
               onClick={() => {
                  dispatch(commonActions.toggleSideBar())
               }}
            >
               <ListItem button key="home">
                  <ListItemIcon>
                     <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
               </ListItem>
            </Link>
            <Link
               to="/trending"
               className={classes.sideNavLink}
               onClick={() => {
                  dispatch(commonActions.toggleSideBar())
               }}
            >
               <ListItem button key="trending">
                  <ListItemIcon>
                     <TrendingIcon />
                  </ListItemIcon>
                  <ListItemText primary="Trending" />
               </ListItem>
            </Link>
            <Link
               to="/video/upload"
               className={classes.sideNavLink}
               onClick={() => {
                  dispatch(commonActions.toggleSideBar())
               }}
            >
               <ListItem button key="upload">
                  <ListItemIcon>
                     <UploadIcon />
                  </ListItemIcon>
                  <ListItemText primary="Upload" />
               </ListItem>
            </Link>
         </List>
      </Drawer>
   )
}
