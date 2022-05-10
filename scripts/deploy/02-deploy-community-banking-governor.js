// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const accounts = await hre.ethers.getSigners();
  const deployer = accounts[0].address;
  const deployments = await hre.ethers.deployments;

  const CBG = await hre.ethers.getContractFactory("CommunityBankingGovernor");
  const cbg = await CBG.deploy();

  await cbg.deployed();

  console.log("CommunityBakingToken deployed to:", cbt.address);
  console.log("Sending deploying account an NFT...");
  console.log("The deployer is " + deployer);

  const tx = await cbt.safeMint(deployer);
  await tx.wait();
  const balance = await cbt.balanceOf(deployer);
  console.log("The balance for account " + deployer + " is " + balance);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
