async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deployeando el contrato con la cuenta: ", deployer.address);
  
    const balance = await deployer.getBalance();
    console.log("Balance de cuenta: ", balance.toString());
  
    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.deploy(deployer.address);
  
    console.log("Dirección de token: ", token.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  