import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import { Grid, Header, Loader } from "semantic-ui-react"
import Typography from "@material-ui/core/Typography"
import { videoActions } from "../../actions/videoActions"
import { Divider } from "@material-ui/core"
import VideoDescription from "./VideoDescription"

class Main extends Component {
   render() {
      return (
         <React.Fragment>
            {this.props.isLoading ? (
               <Loader active={this.props.isLoading}>Loading...</Loader>
            ) : (
               <Grid relaxed>
                  <Grid.Row>
                     <Grid.Column width={12}>
                        <Grid.Row>
                           <video
                              id="player"
                              style={{
                                 objectFit: "cover",
                              }}
                              poster={
                                 this.props.isVideoLoading
                                    ? ``
                                    : this.props.isVideoNotFound
                                    ? `/images/video-not-found.webp`
                                    : this.props.currentVideo.metadata.thumbnail
                                    ? `https://ipfs.infura.io/ipfs/${this.props.currentVideo.metadata.thumbnail}`
                                    : `/images/default-thumbnail.png`
                              }
                              width="100%"
                              height="450"
                              src={
                                 !this.props.isVideoNotFound &&
                                 !this.props.isVideoLoading
                                    ? `https://ipfs.infura.io/ipfs/${this.props.currentVideo.metadata.video}`
                                    : `/images/video-not-found.webp`
                              }
                              controls
                              autoPlay={true}
                              onError={(e) => {
                                 // console.log(e)
                              }}
                              onEnded={() => {
                                 // console.log("video ended")
                              }}
                           />
                        </Grid.Row>
                        <Grid.Row>
                           <Divider />
                        </Grid.Row>
                        <Grid.Row>
                           {this.props.currentVideo.metadata ? (
                              <VideoDescription
                                 videoTitle={
                                    this.props.currentVideo.metadata.title
                                 }
                                 videoDescription={
                                    this.props.currentVideo.metadata.description
                                 }
                                 videoOwner={
                                    this.props.currentVideo.metadata.owner
                                 }
                                 videoTimeStamp={
                                    this.props.currentVideo.metadata.timestamp
                                 }
                              />
                           ) : null}
                        </Grid.Row>
                     </Grid.Column>

                     <Grid.Column
                        width={4}
                        style={{ height: window.innerHeight, overflow: "auto" }}
                     >
                        {this.props.videos.map((video) => {
                           if (video.hash !== this.props.currentVideo.hash) {
                              return (
                                 <Grid.Row key={video.hash}>
                                    <Grid.Column
                                       style={{
                                          textAlign: "center",
                                          padding: "2%",
                                          width: `90%`,
                                          margin: `auto`,
                                          marginBottom: "1%",
                                       }}
                                    >
                                       <Link to={`/watch?video=${video.hash}`}>
                                          <video
                                             poster={
                                                video.metadata.thumbnail
                                                   ? `https://ipfs.infura.io/ipfs/${video.metadata.thumbnail}`
                                                   : `/images/default-thumbnail.png`
                                             }
                                             style={{
                                                cursor: "pointer",
                                                width: "100%",
                                                height: 150,
                                                objectFit: "fill",
                                             }}
                                             src={`https://ipfs.infura.io/ipfs/${video.metadata.video}`}
                                          />
                                       </Link>
                                       <Typography variant="body2">
                                          {video.metadata.title}
                                       </Typography>
                                    </Grid.Column>
                                 </Grid.Row>
                              )
                           }
                        })}
                     </Grid.Column>
                  </Grid.Row>
               </Grid>
            )}
         </React.Fragment>
      )
   }

   componentDidMount() {
      // this.props.getVideo()
      let search = this.props.location.search.split("=")[1]
      if (search && search.length > 0) {
         this.props.getVideo(search, this.props.videos)
      }
   }
   componentDidUpdate() {}
}

const mapStateToProps = (state) => {
   return {
      videos: state.video.videos,
      user: state.user,
      contract: state.video.dvideo,
      currentVideo: state.video.currentVideo,
      isVideoNotFound: state.video.isVideoNotFound,
      isVideoLoading: state.video.isVideoLoading,
      isLoading: state.video.loading,
   }
}

const actions = {
   changeVideo: videoActions.changeVideo,
   getVideo: videoActions.getVideo,
}

export default withRouter(connect(mapStateToProps, actions)(Main))
