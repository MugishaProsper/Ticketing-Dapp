const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TicketNFT", function () {
  let TicketNFT;
  let ticketNFT;
  let owner;
  let addr1;
  let addr2;
  const ticketPrice = ethers.utils.parseEther("0.01");
  const maxTickets = 1000;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    TicketNFT = await ethers.getContractFactory("TicketNFT");
    ticketNFT = await TicketNFT.deploy("Event Ticket", "TCKT", ticketPrice, maxTickets);
    await ticketNFT.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await ticketNFT.owner()).to.equal(owner.address);
    });

    it("Should set the correct ticket price", async function () {
      expect(await ticketNFT.ticketPrice()).to.equal(ticketPrice);
    });

    it("Should set the correct max tickets", async function () {
      expect(await ticketNFT.maxTickets()).to.equal(maxTickets);
    });
  });

  describe("Minting", function () {
    it("Should mint a new ticket", async function () {
      const uri = "ipfs://test-uri";
      await ticketNFT.connect(addr1).safeMint(uri, { value: ticketPrice });
      
      expect(await ticketNFT.ownerOf(0)).to.equal(addr1.address);
      expect(await ticketNFT.tokenURI(0)).to.equal(uri);
    });

    it("Should fail if payment is insufficient", async function () {
      const uri = "ipfs://test-uri";
      const lowPrice = ethers.utils.parseEther("0.005");
      
      await expect(
        ticketNFT.connect(addr1).safeMint(uri, { value: lowPrice })
      ).to.be.revertedWith("Insufficient payment");
    });

    it("Should fail if max tickets reached", async function () {
      const uri = "ipfs://test-uri";
      const smallMaxTickets = 2;
      
      const smallTicketNFT = await TicketNFT.deploy(
        "Event Ticket",
        "TCKT",
        ticketPrice,
        smallMaxTickets
      );
      await smallTicketNFT.deployed();

      await smallTicketNFT.connect(addr1).safeMint(uri, { value: ticketPrice });
      await smallTicketNFT.connect(addr1).safeMint(uri, { value: ticketPrice });
      
      await expect(
        smallTicketNFT.connect(addr1).safeMint(uri, { value: ticketPrice })
      ).to.be.revertedWith("All tickets have been sold");
    });
  });

  describe("Ticket Usage", function () {
    beforeEach(async function () {
      const uri = "ipfs://test-uri";
      await ticketNFT.connect(addr1).safeMint(uri, { value: ticketPrice });
    });

    it("Should mark ticket as used", async function () {
      await ticketNFT.connect(addr1).useTicket(0);
      expect(await ticketNFT.isTicketUsed(0)).to.be.true;
    });

    it("Should fail if ticket already used", async function () {
      await ticketNFT.connect(addr1).useTicket(0);
      await expect(
        ticketNFT.connect(addr1).useTicket(0)
      ).to.be.revertedWith("Ticket already used");
    });

    it("Should fail if caller is not ticket owner", async function () {
      await expect(
        ticketNFT.connect(addr2).useTicket(0)
      ).to.be.revertedWith("Not ticket owner");
    });
  });

  describe("Admin Functions", function () {
    it("Should allow owner to change ticket price", async function () {
      const newPrice = ethers.utils.parseEther("0.02");
      await ticketNFT.connect(owner).setTicketPrice(newPrice);
      expect(await ticketNFT.ticketPrice()).to.equal(newPrice);
    });

    it("Should fail if non-owner tries to change ticket price", async function () {
      const newPrice = ethers.utils.parseEther("0.02");
      await expect(
        ticketNFT.connect(addr1).setTicketPrice(newPrice)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should allow owner to withdraw funds", async function () {
      const uri = "ipfs://test-uri";
      await ticketNFT.connect(addr1).safeMint(uri, { value: ticketPrice });

      const initialBalance = await owner.getBalance();
      const tx = await ticketNFT.connect(owner).withdraw();
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed.mul(receipt.effectiveGasPrice);

      const finalBalance = await owner.getBalance();
      expect(finalBalance.sub(initialBalance)).to.equal(ticketPrice.sub(gasUsed));
    });

    it("Should fail if non-owner tries to withdraw", async function () {
      await expect(
        ticketNFT.connect(addr1).withdraw()
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });
});