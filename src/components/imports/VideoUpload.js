import { Container } from "@material-ui/core"
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Form, Button, Segment, Loader } from "semantic-ui-react"
import { videoActions } from "../../actions/videoActions"
import { appHelperFunctions } from "../../helpers/appHelper"
import Typography from "@material-ui/core/Typography"
import SignIn from "./SignIn/SignIn"
import { withRouter } from "react-router-dom"

const VideoUpload = (props) => {
   const [videoTitle, setVideoTitle] = useState(props.title)
   const [isUploading, setIsUploading] = useState(false)
   const appState = useSelector((state) => state.video)
   const dispatch = useDispatch()
   const isWeb3Available = useSelector((state) => state.user.isWeb3Available)
   const account = useSelector((state) => state.user.account)

   useEffect(() => {
      if (!isWeb3Available || !account) {
         props.history.push({
            pathname: "/signin",
            state: { callbackUrl: props.history.location.pathname },
         })
      }
   })

   return (
      <Container style={{ width: "50%" }}>
         <Typography
            style={{ textAlign: "center", fontWeight: 800 }}
            component="h1"
            variant="h4"
         >
            UPLOAD YOUR VIDEO
         </Typography>

         <Form>
            <Form.Field>
               <label>Title</label>
               <input
                  id="videoTitle"
                  type="text"
                  className="form-control-sm"
                  placeholder="Title.."
                  onChange={(e) => setVideoTitle(e.target.value)}
                  required
               />
            </Form.Field>
            <Form.Field>
               <label>File to upload</label>
               <input
                  id="video"
                  type="file"
                  accept=".mp4, .mkv, .ogg, .wmv"
                  onChange={(e) => {
                     const file = e.target.files[0]
                     const reader = new window.FileReader()
                     reader.readAsArrayBuffer(file)

                     reader.onloadend = () => {
                        dispatch(
                           videoActions.setData("currentTitle", videoTitle)
                        )
                        dispatch(
                           videoActions.setData("buffer", Buffer(reader.result))
                        )
                     }
                  }}
               />
            </Form.Field>

            <Button
               type="submit"
               onClick={() => {
                  console.log("Submitting to IPFS....")

                  const ipfs = appHelperFunctions.getIPFSClient()
                  //Add to IPFS
                  ipfs.add(appState.buffer, (err, result) => {
                     console.log("IPFS result", result)
                     if (err) {
                        console.error(err)
                        return
                     }
                     setIsUploading(true)
                     // Put on blockchain
                     appState.dvideo.methods
                        .uploadVideo(result[0].hash, appState.currentTitle)
                        .send({ from: account })
                        .on("transactionHash", (hash) => {
                           setIsUploading(false)
                        })
                  })
               }}
            >
               Submit
            </Button>
            <Loader active={isUploading}>uploading...</Loader>
         </Form>
      </Container>
   )
}

export default withRouter(VideoUpload)
