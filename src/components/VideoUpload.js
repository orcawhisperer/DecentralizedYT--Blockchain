import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Form, Button, Segment, Loader } from "semantic-ui-react"
import { videoActions } from "../actions/videoActions"
import { initApp } from "../services/init"

export const VideoUpload = (props) => {
   const [videoTitle, setVideoTitle] = useState(props.title)
   const [isUploading, setIsUploading] = useState(false)
   const appState = useSelector((state) => state.video)
   const dispatch = useDispatch()

   return (
      <Segment style={{ width: "50%" }}>
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

                  const ipfs = initApp.getIPFSClient()
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
                        .send({ from: appState.account })
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
      </Segment>
   )
}
