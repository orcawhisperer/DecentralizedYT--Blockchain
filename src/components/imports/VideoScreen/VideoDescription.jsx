import React from "react"
import Identicon from "identicon.js"
import { makeStyles } from "@material-ui/core/styles"
import clsx from "clsx"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Collapse from "@material-ui/core/Collapse"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import { red } from "@material-ui/core/colors"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { appHelperFunctions } from "../../../helpers/appHelper"
import ReactTextFormat from "react-text-format"
import Skeleton from "@material-ui/lab/Skeleton"

const useStyles = makeStyles((theme) => ({
   root: {
      maxWidth: "100%",
   },
   media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
   },
   expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
         duration: theme.transitions.duration.shortest,
      }),
   },
   expandOpen: {
      transform: "rotate(180deg)",
   },
   avatar: {
      //   backgroundColor: red[500],
   },
}))

export default function VideoDescription(props) {
   const classes = useStyles()
   const [expanded, setExpanded] = React.useState(false)

   const handleExpandClick = () => {
      setExpanded(!expanded)
   }

   return (
      <Card className={classes.root}>
         <CardHeader
            avatar={
               props.isVideoLoading ? (
                  <Skeleton
                     animation="wave"
                     variant="circle"
                     width={40}
                     height={40}
                  />
               ) : (
                  <Avatar aria-label="recipe" className={classes.avatar}>
                     <img
                        width="100%"
                        height="100%"
                        src={`data:image/png;base64,${new Identicon(
                           props.videoOwner
                              ? props.videoOwner
                              : "thisisarandomhashforavataar",
                           30
                        ).toString()}`}
                        alt=""
                     />
                  </Avatar>
               )
            }
            action={
               props.isVideoLoading ? null : (
                  <IconButton aria-label="settings">
                     <MoreVertIcon />
                  </IconButton>
               )
            }
            title={
               props.isVideoLoading ? (
                  <Skeleton
                     animation="wave"
                     height={10}
                     width="80%"
                     style={{ marginBottom: 6 }}
                  />
               ) : (
                  props.videoTitle
               )
            }
            subheader={
               props.isVideoLoading ? (
                  <Skeleton animation="wave" height={10} width="40%" />
               ) : (
                  <span>
                     {props.videoViews +
                        " views - " +
                        appHelperFunctions.covertISOToDateTimeString(
                           props.videoTimeStamp
                        )}
                  </span>
               )
            }
         />
         {/* <CardContent>
            {props.isVideoLoading ? (
               <React.Fragment>
                  <Skeleton
                     animation="wave"
                     height={10}
                     style={{ marginBottom: 6 }}
                  />
                  <Skeleton animation="wave" height={10} width="80%" />
               </React.Fragment>
            ) : (
               <Typography
                  style={{
                     whiteSpace: "pre-line",
                  }}
                  variant="body1"
                  color="textSecondary"
                  component="p"
               >
                  <ReactTextFormat>{props.videoDescription}</ReactTextFormat>
               </Typography>
            )}
         </CardContent> */}
         <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
               <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
               <ShareIcon />
            </IconButton>
            <IconButton
               className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
               })}
               
               onClick={handleExpandClick}
               aria-expanded={expanded}
               aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
         </CardActions>{" "}
         *
         <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
               <Typography
                  style={{
                     whiteSpace: "pre-line",
                  }}
                  variant="body1"
                  color="textPrimary"
                  component="p"
               >
                  <ReactTextFormat>{props.videoDescription}</ReactTextFormat>
               </Typography>
            </CardContent>
         </Collapse>
      </Card>
   )
}
