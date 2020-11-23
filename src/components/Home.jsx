import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Grid, Loader, Header } from "semantic-ui-react"

class Home extends Component {
   render() {
      console.log(this.props.loading)
      if (this.props.loading) {
         return (
            <Loader size="big" active={this.props.loading}>
               Loading
            </Loader>
         )
      } else {
         return (
            <Grid celled="internally" stackable columns={4}>
               <Grid.Row>
                  {this.props.videos.map((video) => {
                     return (
                        <Grid.Column
                           style={{
                              textAlign: "center",
                              //   padding: "5%",
                           }}
                        >
                           <video
                              onClick={() => {
                                 this.props.changeVideo(video.hash, video.title)
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
         )
      }
   }
}

export default withRouter(Home)
