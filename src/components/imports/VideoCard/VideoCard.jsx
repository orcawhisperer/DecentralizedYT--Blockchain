import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Typography from "@material-ui/core/Typography"
import Skeleton from "@material-ui/lab/Skeleton"

const useStyles = makeStyles((theme) => ({
   card: {
      minWidth: "20vw",
      maxWidth: "22vw",
      margin: theme.spacing(2),
   },
   media: {
      height: 190,
   },
}))

const VideoCard = (props) => {
   const classes = useStyles()

   return (
      <Card className={classes.card}>
         {props.loading ? (
            <Skeleton
               animation="wave"
               variant="rect"
               className={classes.media}
            />
         ) : (
            <CardMedia
               className={classes.media}
               image={props.poster}
               title={props.title}
            />
         )}

         <CardContent>
            {props.loading ? (
               <React.Fragment>
                  <Skeleton
                     animation="wave"
                     height={10}
                     style={{ marginBottom: 6 }}
                  />
                  <Skeleton animation="wave" height={10} width="80%" />
               </React.Fragment>
            ) : (
               <Typography variant="body1" color="textPrimary" component="p">
                  {props.title}
               </Typography>
            )}
         </CardContent>
      </Card>
   )
}
export default VideoCard
