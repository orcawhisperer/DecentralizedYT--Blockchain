import React, { useEffect, useState } from "react"
import { Form, Button, Segment } from "semantic-ui-react"

export const VideoUpload = (props) => {
   const [videoTitle, setVideoTitle] = useState(props.title)
   useEffect(() => {}, [props])
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
                  onChange={(e) => props.captureFile(e, videoTitle)}
                  //   required
               />
            </Form.Field>
            {/* <Form.Field>
            <Checkbox label="I agree to the Terms and Conditions" />
         </Form.Field> */}
            <Button
               type="submit"
               onClick={() => {
                  props.uploadVideo()
               }}
            >
               Submit
            </Button>
         </Form>
      </Segment>
   )
}
