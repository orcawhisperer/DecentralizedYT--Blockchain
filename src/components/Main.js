import React, { Component } from "react"

class Main extends Component {
   render() {
      return (
         <div className="container-fluid text-monospace">
            <br></br>
            &nbsp;
            <br></br>
            <div className="row">
               <div className="col-md-10">
                  <div
                     className="embed-responsive embed-responsive-16by9"
                     style={{ maxHeight: 400, width: 600 }}
                  >
                     {/* Video... */}
                     <video
                        src={`https://ipfs.infura.io/ipfs/${this.props.currentHash}`}
                        controls
                        autoPlay
                     />
                  </div>
               </div>
               <h3>
                  {
                     /* Code... */
                     this.props.currentTitle
                  }
               </h3>
               <div
                  className="col-md-2 overflow-auto text-center"
                  style={{ maxHeight: "768px", minWidth: "175px" }}
               >
                  <h5>
                     <b>Share Video</b>
                  </h5>

                  {/* Map Video...*/}
                  {/* Return Video...*/}
                  <div style={{ width: "175px" }}>
                     <div className="card-title bg-dark">
                        <small className="text-white">
                           <b>{/*Video title*/}</b>
                        </small>
                     </div>
                     <div>
                        {/* Change Video...*/}
                        {/* Return Side Videos...*/}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default Main
