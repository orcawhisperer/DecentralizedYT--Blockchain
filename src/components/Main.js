import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Grid, Header, Loader } from "semantic-ui-react"
import { videoActions } from "../actions/videoActions"

class Main extends Component {
   render() {
      console.log("refreshed")
      return (
         <React.Fragment>
            {this.props.isLoading ? (
               <Loader active={this.props.isLoading}>Loading...</Loader>
            ) : (
               <Grid>
                  <Grid.Row>
                     <Grid.Column width={12}>
                        <video
                           width="100%"
                           height="450"
                           src={`https://ipfs.infura.io/ipfs/${this.props.currentHash}#t=0.6`}
                           controls
                           autoPlay="true"
                        />
                        <Header>{this.props.currentTitle}</Header>
                     </Grid.Column>

                     <Grid.Column
                        width={4}
                        style={{ height: 511, overflow: "auto" }}
                     >
                        {this.props.videos.map((video) => {
                           if (video.hash !== this.props.currentHash) {
                              return (
                                 <Grid.Row key={video.hash}>
                                    <Grid.Column
                                       style={{
                                          textAlign: "center",
                                          padding: "2%",
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
}

const mapStateToProps = (state) => {
   return {
      videos: state.video.videos,
      currentHash: state.video.currentHash,
      currentTitle: state.video.currentTitle,
      isLoading: state.video.loading,
   }
}

const actions = {
   changeVideo: videoActions.changeVideo,
}

export default withRouter(connect(mapStateToProps, actions)(Main))
