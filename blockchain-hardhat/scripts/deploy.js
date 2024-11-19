const { ethers } = require('ethers');

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contract with the account: ", deployer.address);
  
    const balance = await deployer.getBalance();
    console.log("Account balance: ", balance.toString());
  
    const Token = await ethers.getContractFactory("Definitivo");
    const token = await Token.deploy();
  
    console.log("Token adress: ", token.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  