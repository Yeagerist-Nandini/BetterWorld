const hre = require("hardhat");

async function main() {
  const taxfee=5;
  const Campaign=await hre.ethers.getContractFactory("Campaign");
  console.log("Contract Deploying...");

  const campaign=await Campaign.deploy(taxfee);
  await campaign.waitForDeployment();

  console.log("Contract address:",campaign.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
