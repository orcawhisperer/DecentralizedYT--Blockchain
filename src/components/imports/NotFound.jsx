import React from "react"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import CssBaseline from "@material-ui/core/CssBaseline"
import Container from "@material-ui/core/Container"

const useStyles = makeStyles((theme) => ({
   pageNotFoundImage: {
      width: `100%`,
   },
   pageNotFoundText: {
      textAlign: "center",
      fontWeight: "bold",
      color: "#454a75",
   },
}))

export default function NonFound(props) {
   const classes = useStyles()
   console.log(props.isWeb3Available)
   return (
      <React.Fragment>
         <CssBaseline />
         <Typography
            variant="h1"
            component="h2"
            gutterBottom
            className={classes.pageNotFoundText}
         >
            {props.msg}
         </Typography>
         <Container maxWidth="sm">
            <img
               className={classes.pageNotFoundImage}
               src="/images/page-not-found.svg"
               alt="page-not-found"
            />
         </Container>
         {!props.isWeb3Available ? (
            <Typography variant="h4" className={classes.pageNotFoundText}>
               Install from{" "}
               <a href="https://metamask.io" target="_blank">
                  <u>here</u>
               </a>{" "}
               and connect to rinkeby test network.
            </Typography>
         ) : null}
      </React.Fragment>
   )
}
