pragma solidity ^0.5.0;

// [x] 1.Model the video
// [x] 2.Store the video
// [x] 3.Upload the video
// [x] 4.List the video

contract DVideo {
    uint256 public videoCount = 0;
    string public name = "DVideo";
    //Create id=>struct mapping
    mapping(string => Video) public videos;

    //Create Struct
    struct Video {
        uint256 id;
        string hash;
        string title;
        uint256 views;
        // uint256 likes;
        // uint256 disLikes;
        address author;
    }

    //Create Event
    // event VideoUpload(
    //     uint256 id,
    //     string hash,
    //     string title,
    //     uint256 views,
    //     address author
    // );

    constructor() public {}

    function viewed(string memory _videoHash)
        public
        returns (string memory, uint256)
    {
        // Make sure the video hash exists
        require(bytes(_videoHash).length > 0);

        // Make sure uploader address exists
        require(msg.sender != address(0));

        if (bytes(videos[_videoHash].hash).length > 0) {
            videos[_videoHash].views++;
            return ("OK", videos[_videoHash].views);
        } else {
            return ("NOT_OK", 0);
        }
    }

    function getVideo(string memory _videoHash)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            uint256
        )
    {
        // Make sure the video hash exists
        require(bytes(_videoHash).length > 0);

        // Make sure uploader address exists
        require(msg.sender != address(0));

        if (bytes(videos[_videoHash].hash).length > 0) {
            return (
                "OK",
                videos[_videoHash].hash,
                videos[_videoHash].title,
                videos[_videoHash].views
            );
        } else {
            return ("NOT_OK", "", "", 0);
        }
    }

    // function liked(string memory _videoHash) public returns (uint256) {
    //     // Make sure the video hash exists
    //     require(bytes(_videoHash).length > 0);

    //     // Make sure uploader address exists
    //     require(msg.sender != address(0));

    //     if (bytes(videos[_videoHash].hash).length > 0) {
    //         videos[_videoHash].likes++;
    //         return videos[_videoHash].likes;
    //     } else {
    //         return 0;
    //     }
    // }

    // function disLiked(string memory _videoHash) public returns (uint256) {
    //     // Make sure the video hash exists
    //     require(bytes(_videoHash).length > 0);

    //     // Make sure uploader address exists
    //     require(msg.sender != address(0));

    //     if (bytes(videos[_videoHash].hash).length > 0) {
    //         videos[_videoHash].likes++;
    //         return videos[_videoHash].likes;
    //     } else {
    //         return 0;
    //     }
    // }

    function uploadVideo(string memory _videoHash, string memory _title)
        public
        returns (string memory)
    {
        // Make sure the video hash exists
        require(bytes(_videoHash).length > 0);

        // Make sure video title exists
        require(bytes(_title).length > 0);

        // Make sure uploader address exists
        require(msg.sender != address(0));

        // Increment video id
        videoCount++;
        // Add video to the contract
        videos[_videoHash] = Video(
            videoCount,
            _videoHash,
            _title,
            0,
            msg.sender
        );

        if (bytes(videos[_videoHash].hash).length > 0) {
            // Trigger an event
            // emit VideoUpload(videoCount, _videoHash, _title, 0, msg.sender);
            return "OK";
        } else {
            return "NOT_OK";
        }
    }
}
