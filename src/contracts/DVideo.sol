pragma solidity ^0.5.0;

// [x] 1.Model the video
// [x] 2.Store the video
// [x] 3.Upload the video
// [x] 4.List the video

contract DVideo {
    uint256 public videoCount = 0;
    string public name = "DVideo";
    //Create id=>struct mapping
    mapping(string => uint256) private videoHashToIndex;
    mapping(uint256 => Video) public videos;

    //Create Struct
    struct Video {
        uint256 id;
        string videoHash;
        string title;
        address author;
    }

    //Create Event
    event VideoUpload(
        uint256 id,
        string videoHash,
        string title,
        address author
    );

    constructor() public {}

    function getVideo(string memory _hash)
        public
        view
        returns (string memory, string memory)
    {
        if (bytes(videos[videoHashToIndex[_hash]].videoHash).length > 0) {
            return ("OK", videos[videoHashToIndex[_hash]].videoHash);
        }

        return ("NOT_OK", "");
    }

    function deleteVideo(string memory _hash)
        public
        returns (string memory, string memory)
    {
        if (bytes(videos[videoHashToIndex[_hash]].videoHash).length > 0) {
            if (msg.sender == videos[videoHashToIndex[_hash]].author) {
                delete videos[videoHashToIndex[_hash]];
                delete videoHashToIndex[_hash];
            } else {
                return ("NOT_OK", "Unauthorized");
            }
        }
        return ("NOT_OK", "video not found");
    }

    function uploadVideo(string memory _videoHash, string memory _title)
        public
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
        videos[videoCount] = Video(videoCount, _videoHash, _title, msg.sender);
        videoHashToIndex[_videoHash] = videoCount;

        // Trigger an event
        emit VideoUpload(videoCount, _videoHash, _title, msg.sender);
    }
}
