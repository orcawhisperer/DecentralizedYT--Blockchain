pragma solidity ^0.5.0;

// [x] 1.Model the video
// [x] 2.Store the video
// [x] 3.Upload the video
// [x] 4.List the video

contract DVideo {
  uint public videoCount = 0;
  string public name = "DVideo";
  //Create id=>struct mapping
  //2.Store the video
  mapping (uint=>Video) public videos;

  //1.Model the video
  //Create Struct
  struct Video {
    uint id;
    string hash;
    string title;
    address author;
  }

  //Create Event
  event VideoUpload(
    uint id,
    string hash,
    string title,
    address author
  );


  constructor() public {
  }

  //3.Upload the video
  function uploadVideo(string memory _videoHash, string memory _title) public {
    // Make sure the video hash exists
    require(bytes(_videoHash).length > 0); 

    // Make sure video title exists
    require(bytes(_title).length > 0);

    // Make sure uploader address exists
    require(msg.sender != address(0));


    // Increment video id
    videoCount ++;
    // Add video to the contract
    videos[videoCount] = Video(videoCount, _videoHash, _title, msg.sender);

    // Trigger an event
    emit VideoUpload(videoCount, _videoHash, _title, msg.sender);
  }
}