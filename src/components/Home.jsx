import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Grid, Header, Loader } from "semantic-ui-react"
import { connect } from "react-redux"
import { videoActions } from "../actions/videoActions"

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
                                    this.props.changeVideo(
                                       video.hash,
                                       video.title
                                    )
                                    this.props.history.push(
                                       `/video?hash=${video.hash}`
                                    )
                                 }}
                                 style={{
                                    cursor: "pointer",
                                    width: 300,
                                    height: 200,
                                    objectFit: "fill",
                                 }}
                                 src={`https://ipfs.infura.io/ipfs/${video.hash}#t=0.6`}
                              />
                              <Header>{video.title}</Header>
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
