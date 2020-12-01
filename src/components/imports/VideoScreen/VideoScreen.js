import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import { Grid } from "semantic-ui-react"
import { videoActions } from "../../../actions/videoActions"
import { Divider } from "@material-ui/core"
import VideoCard from "../VideoCard/VideoCard"
import VideoDescription from "./VideoDescription"
import Player from "../Player/Player"
import { appHelperFunctions } from "../../../helpers/appHelper"

class VideoScreen extends Component {
   constructor(props) {
      super(props)
      this.state = {
         views: 0,
      }
   }
   renderVideoCards = () => {
      let cards = []
      if (this.props.isLoading) {
         for (let index = 0; index < 6; index++) {
            cards.push(
               <VideoCard
                  key={`side-placeholders-${index}`}
                  loading={this.props.isLoading}
               />
            )
         }
      } else {
         cards = []
         this.props.videos.forEach((video) => {
            if (video.hash !== this.props.currentVideo.hash) {
               cards.push(
                  <Link key={video.hash} to={`/watch?video=${video.hash}`}>
                     <VideoCard
                        loading={this.props.isLoading}
                        title={video.metadata.title}
                        poster={`https://ipfs.infura.io/ipfs/${video.metadata.thumbnail}`}
                        src={`https://ipfs.infura.io/ipfs/${video.metadata.video}`}
                     />
                  </Link>
               )
            }
         })
      }
      return cards
   }

   render() {
      if (
         !this.props.isVideoLoading &&
         this.props.currentVideo.metadata.video
      ) {
         this.getViewsData(this.props.currentVideo.metadata.video)
      }
      return (
         <React.Fragment>
            <Grid relaxed>
               <Grid.Row>
                  <Grid.Column width={12}>
                     <Grid.Row>
                        <Player
                           views={this.state.views}
                           sources={{
                              type: "video",
                              poster: `https://ipfs.infura.io/ipfs/${this.props.currentVideo.metadata.thumbnail}`,
                              sources: [
                                 {
                                    src: `https://ipfs.infura.io/ipfs/${this.props.currentVideo.metadata.video}`,
                                    type: "video/mp4",
                                 },
                              ],
                           }}
                        />
                     </Grid.Row>
                     <Grid.Row>
                        <Divider />
                     </Grid.Row>
                     <Grid.Row>
                        {this.props.currentVideo.metadata ? (
                           <VideoDescription
                              isVideoLoading={this.props.isVideoLoading}
                              videoViews={this.state.views}
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
                     style={{ height: window.outerHeight, overflow: "auto" }}
                  >
                     <Grid.Row>{this.renderVideoCards()}</Grid.Row>
                  </Grid.Column>
               </Grid.Row>
            </Grid>
         </React.Fragment>
      )
   }

   getViewsData = (hash) => {
      let fb = appHelperFunctions.getFireBaseClient()
      const dbREf = fb.database().ref().child(hash)
      dbREf.on("value", (snap) => {
         let views = snap.val()
         if (this.state.views !== views) {
            this.setState({
               views: views,
            })
         }
      })
   }

   componentDidMount() {
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

export default withRouter(connect(mapStateToProps, actions)(VideoScreen))
