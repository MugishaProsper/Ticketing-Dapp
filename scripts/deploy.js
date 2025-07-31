const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy TicketNFT
  const ticketPrice = ethers.utils.parseEther("0.01"); // 0.01 ETH per ticket
  const maxTickets = 1000; // Maximum number of tickets

  const TicketNFT = await hre.ethers.getContractFactory("TicketNFT");
  const ticketNFT = await TicketNFT.deploy(
    "Event Ticket",
    "TCKT",
    ticketPrice,
    maxTickets
  );

  await ticketNFT.deployed();

  console.log("TicketNFT deployed to:", ticketNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });