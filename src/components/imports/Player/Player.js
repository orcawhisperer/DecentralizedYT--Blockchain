import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import plyr from "plyr"
import "plyr/dist/plyr.css"
import { appHelperFunctions } from "../../../helpers/appHelper"

class Player extends React.Component {
   state = {
      isViewUpadating: false,
   }

   componentDidMount() {
      this.player = new plyr(".js-plyr", this.props.options)
      this.player.source = this.props.sources
   }

   componentWillUnmount() {
      if (!this.state.isVideoLoading) {
         let firebase = appHelperFunctions.getFireBaseClient()
         firebase
            .database()
            .ref(`${this.props.video}`)
            .set(this.props.views + 1)
      }
      this.player.destroy()
   }

   componentDidUpdate(props) {
      if (
         JSON.stringify(this.props.sources) !== JSON.stringify(props.sources)
      ) {
         this.player.destroy()
         this.player = new plyr(".js-plyr", this.props.options)
         this.player.source = this.props.sources
      }
   }

   render() {
      return <video className="js-plyr plyr" />
   }
}

Player.defaultProps = {
   options: {
      controls: [
         "rewind",
         "play",
         "fast-forward",
         "progress",
         "current-time",
         "duration",
         "mute",
         "volume",
         "pip",
         "settings",
         "fullscreen",
      ],
      autoplay: true,
      tooltips: { controls: true, seek: true },
      i18n: {
         restart: "Restart",
         rewind: "Rewind {seektime}s",
         play: "Play",
         pause: "Pause",
         fastForward: "Forward {seektime}s",
         seek: "Seek",
         seekLabel: "{currentTime} of {duration}",
         played: "Played",
         buffered: "Buffered",
         currentTime: "Current time",
         duration: "Duration",
         volume: "Volume",
         mute: "Mute",
         unmute: "Unmute",
         enableCaptions: "Enable captions",
         disableCaptions: "Disable captions",
         download: "Download",
         enterFullscreen: "Enter fullscreen",
         exitFullscreen: "Exit fullscreen",
         frameTitle: "Player for {title}",
         captions: "Captions",
         settings: "Settings",
         menuBack: "Go back to previous menu",
         speed: "Speed",
         normal: "Normal",
         quality: "Quality",
         loop: "Loop",
      },
   },
   sources: {
      type: "video",
      sources: [
         {
            src: "",
            type: "video/mp4",
            // size: 720,
         },
         {
            src: "",
            type: "video/webm",
            // size: 1080,
         },
      ],
   },
}

Player.propTypes = {
   options: PropTypes.object,
   sources: PropTypes.object,
   source: PropTypes.func,
   destroy: PropTypes.func,
   views: PropTypes.number,
}

const mapStateToProps = (state) => {
   return {
      video: state.video.currentVideo.metadata.video,
      thumbnail: state.video.currentVideo.metadata.thumbnail,
      isVideoNotFound: state.video.isVideoNotFound,
      isVideoLoading: state.video.isVideoLoading,
   }
}

export default withRouter(connect(mapStateToProps, null)(Player))
