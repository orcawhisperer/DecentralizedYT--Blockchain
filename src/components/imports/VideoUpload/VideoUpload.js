import { Container } from "@material-ui/core"
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Form, Button, Segment, Loader } from "semantic-ui-react"
import { videoActions } from "../../../actions/videoActions"
import { appHelperFunctions } from "../../../helpers/appHelper"
import Typography from "@material-ui/core/Typography"
import TextareaAutosize from "@material-ui/core/TextareaAutosize"
import LinearProgress from "@material-ui/core/LinearProgress"
import Snackbar from "@material-ui/core/Snackbar"
import Alert from "@material-ui/lab/Alert"
import { withRouter } from "react-router-dom"

const VideoUpload = (props) => {
   const [videoTitle, setVideoTitle] = useState(props.title)
   const [isUploading, setIsUploading] = useState(false)
   const [isErrorPublishing, setIsErrorPublishing] = useState({
      isToast: false,
      isError: false,
      msg: "",
   })
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
                  onChange={(e) => {
                     setVideoTitle(e.target.value)
                     dispatch(
                        videoActions.setData("currentTitle", e.target.value)
                     )
                  }}
                  required
               />
            </Form.Field>
            <Form.Field>
               <label>Decription</label>
               <TextareaAutosize
                  aria-label="minimum height"
                  rowsMin={3}
                  placeholder="Video description..."
                  onChange={(e) => {
                     setVideoTitle(e.target.value)
                     dispatch(
                        videoActions.setData("description", e.target.value)
                     )
                  }}
                  required
               />
            </Form.Field>
            <Form.Field>
               <label>Thumbnail</label>
               <input
                  id="thumbnail"
                  type="file"
                  accept=".jpeg, .png, .gif, .svg"
                  onChange={(e) => {
                     const file = e.target.files[0]
                     const reader = new window.FileReader()
                     reader.readAsArrayBuffer(file)
                     reader.onloadend = () => {
                        dispatch(
                           videoActions.setData(
                              "thumbnail",
                              Buffer(reader.result)
                           )
                        )
                     }
                  }}
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
                           videoActions.setData("buffer", Buffer(reader.result))
                        )
                     }
                  }}
               />
            </Form.Field>

            {isUploading ? <LinearProgress variant="indeterminate" /> : null}

            <Button
               type="submit"
               style={{ marginTop: "2%" }}
               onClick={() => {
                  // let data = {
                  //    a: "123",
                  //    b: "test",
                  // }

                  // ipfs.add(Buffer.from(JSON.stringify(data)))
                  //    .then((res) => {
                  //       const hash = res[0].hash
                  //       console.log("added data hash:", hash)
                  //       return ipfs.cat(hash)
                  //    })
                  //    .then((output) => {
                  //       console.log("retrieved data:", JSON.parse(output))
                  //    })

                  // Add to IPFS
                  if (
                     appState.buffer &&
                     appState.currentTitle &&
                     appState.description &&
                     appState.thumbnail
                  ) {
                     console.log("Submitting to IPFS....")

                     let videoHash = ""
                     let thumbnailHash = ""
                     let metaHash = ""

                     const ipfs = appHelperFunctions.getIPFSClient()
                     setIsUploading(true)
                     console.log("uploading video...")
                     ipfs.add(appState.buffer, (err, result) => {
                        if (err) {
                           setIsUploading(false)
                           console.error(err)
                           return
                        }
                        console.log("Video uploaded", result)
                        videoHash = result[0].hash
                        if (videoHash) {
                           ipfs.add(appState.thumbnail, (err, result) => {
                              console.log("uploading thumbnail ...")
                              if (err) {
                                 setIsUploading(false)
                                 console.error(err)
                                 return
                              }
                              thumbnailHash = result[0].hash
                              const metadata = {
                                 title: appState.currentTitle,
                                 description: appState.description,
                                 thumbnail: thumbnailHash,
                                 video: videoHash,
                                 owner: account,
                                 timestamp: new Date(),
                              }

                              console.log("uploading metadata...")
                              ipfs.add(
                                 Buffer.from(JSON.stringify(metadata)),
                                 (err, result) => {
                                    if (err) {
                                       setIsUploading(false)
                                       console.error(err)
                                       return
                                    }
                                    metaHash = result[0].hash
                                    if (
                                       appState.currentTitle &&
                                       videoHash &&
                                       metaHash
                                    ) {
                                       // Put on blockchain
                                       appState.dvideo.methods
                                          .uploadVideo(
                                             metaHash,
                                             appState.currentTitle
                                          )
                                          .send({ from: account })
                                          .on("transactionHash", (hash) => {
                                             setIsUploading(false)
                                             setIsErrorPublishing({
                                                isToast: true,
                                                isError: false,
                                                msg:
                                                   "Video uploaded successfully and will get published once your transaction is confirmed",
                                             })
                                          })
                                          .catch((err) => {
                                             if (
                                                err.message &&
                                                err.message.includes(
                                                   "User denied transaction signature."
                                                )
                                             ) {
                                                setIsUploading(false)
                                                setIsErrorPublishing({
                                                   isToast: true,
                                                   isError: true,
                                                   msg:
                                                      "Video not publised - Transaction failed! ",
                                                })
                                             }
                                          })
                                    } else {
                                       setIsUploading(false)
                                       setIsErrorPublishing({
                                          isToast: true,
                                          isError: true,
                                          msg: "Fill all the details ",
                                       })
                                    }
                                 }
                              )
                           })
                        }
                     })
                  } else {
                     setIsErrorPublishing({
                        isToast: true,
                        isError: true,
                        msg: "Fill all the details ",
                     })
                  }
               }}
            >
               Submit
            </Button>
         </Form>
         <Snackbar
            open={isErrorPublishing.isToast}
            autoHideDuration={6000}
            onClose={() =>
               setIsErrorPublishing({ isToast: false, isError: true, msg: "" })
            }
         >
            <Alert
               elevation={6}
               variant="filled"
               onClose={() =>
                  setIsErrorPublishing({
                     isToast: false,
                     isError: true,
                     msg: "",
                  })
               }
               severity={isErrorPublishing.isError ? "error" : "success"}
            >
               {isErrorPublishing.msg}
            </Alert>
         </Snackbar>
      </Container>
   )
}

export default withRouter(VideoUpload)
