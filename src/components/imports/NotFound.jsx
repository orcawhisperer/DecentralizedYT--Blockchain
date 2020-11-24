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

export default function NonFound() {
   const classes = useStyles()
   return (
      <React.Fragment>
         <CssBaseline />
         <Typography
            variant="h1"
            component="h2"
            gutterBottom
            className={classes.pageNotFoundText}
         >
            404
         </Typography>
         <Container maxWidth="sm">
            <img
               className={classes.pageNotFoundImage}
               src="/images/page-not-found.svg"
               alt="page-not-found"
            />
         </Container>
      </React.Fragment>
   )
}
