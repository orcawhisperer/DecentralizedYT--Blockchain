import React, { Component } from "react"
import { withRouter, Link } from "react-router-dom"
import { Grid } from "semantic-ui-react"
import { connect } from "react-redux"
import { videoActions } from "../../actions/videoActions"
import VideoCard from "./VideoCard/VideoCard"

class Home extends Component {
   renderVideoCards = () => {
      let cards = []
      if (this.props.isLoading) {
         for (let index = 0; index < 8; index++) {
            cards.push(
               <Grid.Column
                  key={`home-video-placeholder${index}`}
                  style={{
                     textAlign: "center",
                  }}
               >
                  <VideoCard loading={this.props.isLoading} />
               </Grid.Column>
            )
         }
      } else {
         cards = []
         this.props.videos.forEach((video) => {
            cards.push(
               <Grid.Column
                  key={video.hash}
                  style={{
                     textAlign: "center",
                  }}
               >
                  <Link to={`/watch?video=${video.hash}`}>
                     <VideoCard
                        loading={this.props.isLoading}
                        title={video.metadata.title}
                        poster={`https://ipfs.infura.io/ipfs/${video.metadata.thumbnail}`}
                        src={`https://ipfs.infura.io/ipfs/${video.metadata.video}`}
                     />
                  </Link>
               </Grid.Column>
            )
         })
      }
      return cards
   }
   render() {
      return (
         <React.Fragment>
            <Grid stackable columns={4}>
               <Grid.Row>{this.renderVideoCards()}</Grid.Row>
            </Grid>
         </React.Fragment>
      )
   }
}

const mapStateToProps = (state) => {
   return {
      videos: state.video.videos,
      isLoading: state.video.loading,
   }
}

const actions = {
   changeVideo: videoActions.changeVideo,
}

export default withRouter(connect(mapStateToProps, actions)(Home))
