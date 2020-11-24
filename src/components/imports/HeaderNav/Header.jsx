import React, { useEffect } from "react"
import Identicon from "identicon.js"
import { Link } from "react-router-dom"
import clsx from "clsx"
import { makeStyles, useTheme, fade } from "@material-ui/core/styles"
import { useDispatch, useSelector } from "react-redux"
import AppBar from "@material-ui/core/AppBar"
import Button from "@material-ui/core/Button"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import InputBase from "@material-ui/core/InputBase"
import SearchIcon from "@material-ui/icons/Search"
import AccountCircle from "@material-ui/icons/AccountCircle"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"

import { commonActions } from "../../../actions/commonActions"

const useStyles = makeStyles((theme) => ({
   appBar: {
      transition: theme.transitions.create(["margin", "width"], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: `white`,
   },
   menuButton: {
      marginRight: theme.spacing(2),
      color: `grey`,
   },
   appBarTitle: {
      color: `black`,
   },
   appBarLogo: {
      width: 125,
      height: 40,
      cursor: "pointer",
   },
   search: {
      position: "relative",
      display: "flex",
      borderRadius: theme.shape.borderRadius,
      margin: "auto",
      width: "30%",
   },

   searchIcon: {
      padding: theme.spacing(0, 2),
      position: "relative",
      backgroundColor: "#f8f8f8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: `grey`,
   },
   inputRoot: {
      color: "grey",
      width: "100%",
   },
   inputInput: {
      backgroundColor: fade(theme.palette.common.black, 0.15),
      "&:hover": {
         backgroundColor: fade(theme.palette.common.black, 0.25),
      },
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
   },
   sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
         display: "flex",
      },
   },
}))

export const Header = () => {
   const classes = useStyles()
   //    const theme = useTheme()
   const dispatch = useDispatch()
   const account = useSelector((state) => state.video.account)
   const menuId = "primary-search-account-menu"

   const [anchorEl, setAnchorEl] = React.useState(null)

   const isMenuOpen = Boolean(anchorEl)

   const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget)
   }

   const handleMenuClose = () => {
      setAnchorEl(null)
   }

   useEffect(() => {
      console.log(account)
   }, [account])

   const renderMenu = (
      <Menu
         anchorEl={anchorEl}
         anchorOrigin={{ vertical: "top", horizontal: "right" }}
         id={menuId}
         keepMounted
         transformOrigin={{ vertical: "top", horizontal: "right" }}
         open={isMenuOpen}
         onClose={handleMenuClose}
      >
         <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
         <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
   )

   return (
      <AppBar position="fixed" className={clsx(classes.appBar)}>
         <Toolbar>
            <IconButton
               color="inherit"
               aria-label="open drawer"
               onClick={() => {
                  dispatch(commonActions.toggleSideBar())
               }}
               edge="start"
               className={clsx(classes.menuButton)}
            >
               <MenuIcon />
            </IconButton>

            <Link to="/">
               <img
                  className={clsx(classes.appBarLogo)}
                  src="/images/TitleLogo.svg"
                  alt="DecentralTY"
               />
            </Link>
            <div className={classes.search}>
               <InputBase
                  placeholder="Search…"
                  classes={{
                     root: classes.inputRoot,
                     input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
               />

               <Button
                  //   variant="contained"
                  className={classes.searchIcon}
                  startIcon={<SearchIcon />}
               />
            </div>
            <div className={classes.sectionDesktop}>
               <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
               >
                  {account ? (
                     <img
                        className="ml-2"
                        width="30"
                        height="30"
                        src={`data:image/png;base64,${new Identicon(
                           account,
                           30
                        ).toString()}`}
                        alt=""
                     />
                  ) : (
                     <AccountCircle />
                  )}
               </IconButton>
            </div>
         </Toolbar>
         {renderMenu}
      </AppBar>
   )
}
