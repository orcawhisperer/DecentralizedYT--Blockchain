import React from "react"
import clsx from "clsx"
import { Route, Switch } from "react-router-dom"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import { Header } from "./HeaderNav/Header"
import { SideNav } from "./SideBar/SideNav"
import { useSelector } from "react-redux"
import { VideoUpload } from "../VideoUpload"
import NotFound from "./NotFound"
import Home from "../Home"
import Main from "../Main"

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
   root: {
      display: "flex",
   },
   content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
   },
   contentShift: {
      transition: theme.transitions.create("margin", {
         easing: theme.transitions.easing.easeOut,
         duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
   },
   drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
   },
}))

export const AppLayout = () => {
   const classes = useStyles()
   // const theme = useTheme()

   const isWeb3Available = useSelector((state) => state.video.isWeb3Available)

   const isSideBarOpen = useSelector((state) => state.common.isSideBarOpen)

   return (
      <div className={classes.root}>
         <CssBaseline />
         <Header />
         <SideNav />
         <main
            className={clsx(classes.content, {
               [classes.contentShift]: isSideBarOpen,
            })}
         >
            <div className={classes.drawerHeader} />
            {isWeb3Available ? (
               <Switch>
                  <Route exact path="/" component={() => <Home />} />

                  <Route exact path="/video" component={() => <Main />} />
                  <Route
                     exact
                     path="/video/upload"
                     component={() => <VideoUpload />}
                  />
                  <Route
                     exact
                     component={() => (
                        <NotFound msg="404" isWeb3Available={isWeb3Available} />
                     )}
                  />
               </Switch>
            ) : (
               <Route
                  exact
                  component={() => (
                     <NotFound
                        msg="MetaMask Wallet Requried"
                        isWeb3Available={isWeb3Available}
                     />
                  )}
               />
            )}
         </main>
      </div>
   )
}
