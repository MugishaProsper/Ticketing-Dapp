// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TicketNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    mapping(uint256 => bool) private _usedTickets;
    uint256 public ticketPrice;
    uint256 public maxTickets;
    uint256 public totalTickets;

    event TicketMinted(address indexed buyer, uint256 indexed tokenId);
    event TicketUsed(uint256 indexed tokenId);
    event TicketPriceChanged(uint256 newPrice);

    constructor(
        string memory name,
        string memory symbol,
        uint256 _ticketPrice,
        uint256 _maxTickets
    ) ERC721(name, symbol) {
        ticketPrice = _ticketPrice;
        maxTickets = _maxTickets;
    }

    function safeMint(string memory uri) public payable {
        require(msg.value >= ticketPrice, "Insufficient payment");
        require(totalTickets < maxTickets, "All tickets have been sold");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        totalTickets++;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);

        emit TicketMinted(msg.sender, tokenId);

        // Return excess payment
        if (msg.value > ticketPrice) {
            payable(msg.sender).transfer(msg.value - ticketPrice);
        }
    }

    function useTicket(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not ticket owner");
        require(!_usedTickets[tokenId], "Ticket already used");

        _usedTickets[tokenId] = true;
        emit TicketUsed(tokenId);
    }

    function isTicketUsed(uint256 tokenId) public view returns (bool) {
        return _usedTickets[tokenId];
    }

    function setTicketPrice(uint256 newPrice) public onlyOwner {
        ticketPrice = newPrice;
        emit TicketPriceChanged(newPrice);
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }

    // Override required functions
    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
