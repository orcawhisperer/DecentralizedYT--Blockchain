import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Grid, Loader } from "semantic-ui-react"
import { connect } from "react-redux"
import Typography from "@material-ui/core/Typography"
import { videoActions } from "../../actions/videoActions"

class Home extends Component {
   render() {
      return (
         <React.Fragment>
            {this.props.isLoading ? (
               <Loader active={this.props.isLoading}>Loading...</Loader>
            ) : (
               <Grid stackable columns={4}>
                  <Grid.Row>
                     {this.props.videos.map((video) => {
                        return (
                           <Grid.Column
                              key={video.hash}
                              style={{
                                 textAlign: "center",
                                 //   padding: "5%",
                              }}
                           >
                              <video
                                 onClick={() => {
                                    this.props.changeVideo(video.id)
                                    this.props.history.push(
                                       `/video?hash=${video.hash}`
                                    )
                                 }}
                                 poster={
                                    video.metadata.thumbnail
                                       ? `https://ipfs.infura.io/ipfs/${video.metadata.thumbnail}`
                                       : `/images/default-thumbnail.png`
                                 }
                                 style={{
                                    cursor: "pointer",
                                    width: "100%",
                                    height: 200,
                                    objectFit: "cover",
                                 }}
                                 src={`https://ipfs.infura.io/ipfs/${video.metadata.video}`}
                              />
                              <Typography variant="body1">
                                 {video.title}
                              </Typography>
                           </Grid.Column>
                        )
                     })}
                  </Grid.Row>
               </Grid>
            )}
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
