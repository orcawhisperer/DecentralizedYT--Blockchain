pragma solidity ^0.5.0;


contract User {
    uint256 public userCount = 0;
    string public name = "User";
    //Create id=>struct mapping
    mapping(string => uint256) private userHashToIndex;
    mapping(uint256 => Peer) public users;

    //Create Struct
    struct Peer {
        uint256 id;
        string name;
        string email;
        bytes32 passwordHash;
        address wallet;
    }

    //Create Event
    event CreateUser(uint256 id, string name, string email, address wallet);

    constructor() public {}

    // function getUser(string memory _email)
    //     public
    //     view
    //     returns (string memory,  memory)
    // {
    //     if (bytes(users[userHashToIndex[_email]].email).length > 0) {
    //         return ("OK", users[userHashToIndex[_email]]);
    //     }

    //     return ("NOT_OK", "");
    // }

    // function deleteVideo(string memory _hash)
    //     public
    //     returns (string memory, string memory)
    // {
    //     if (bytes(videos[videoHashToIndex[_hash]].videoHash).length > 0) {
    //         if (msg.sender == videos[videoHashToIndex[_hash]].wallet) {
    //             delete videos[videoHashToIndex[_hash]];
    //             delete videoHashToIndex[_hash];
    //         } else {
    //             return ("NOT_OK", "Unauthorized");
    //         }
    //     }
    //     return ("NOT_OK", "video not found");
    // }

    function createUser(
        string memory _name,
        string memory _email,
        string memory _password
    ) public {
        // Make sure the name exists
        require(bytes(_name).length > 0);

        // Make sure email exists
        require(bytes(_email).length > 0);

        // Make sure password exists
        require(bytes(_password).length > 0);

        // Make sure uploader address exists
        require(msg.sender != address(0));

        // Increment user id
        userCount++;
        // Add user to the contract
        users[userCount] = Peer(
            userCount,
            _name,
            _email,
            keccak256(bytes(_password)),
            msg.sender
        );
        userHashToIndex[_email] = userCount;

        // Trigger an event
        emit CreateUser(userCount, _name, _email, msg.sender);
    }
}
