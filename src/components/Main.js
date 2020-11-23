import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { Grid, Segment, Header } from "semantic-ui-react"

class Main extends Component {
   render() {
      return (
         <Segment>
            <Grid>
               <Grid.Row>
                  <Grid.Column width={12}>
                     <video
                        width="100%"
                        height="450"
                        src={`https://ipfs.infura.io/ipfs/${this.props.currentHash}#t=0.6`}
                        controls
                     />
                     <Header>{this.props.currentTitle}</Header>
                  </Grid.Column>

                  <Grid.Column width={4}>
                     {this.props.videos.map((video) => {
                        if (video.hash !== this.props.currentHash) {
                           return (
                              <Grid.Row>
                                 <Grid.Column
                                    style={{
                                       textAlign: "center",
                                       padding: "5%",
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
                                 </Grid.Column>
                              </Grid.Row>
                           )
                        }
                     })}
                  </Grid.Column>
               </Grid.Row>
            </Grid>
         </Segment>
      )
   }
}

export default withRouter(Main)
