// require("@nomicfoundation/hardhat-toolbox");
// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.20",
// };

// curl https://mainnet.infura.io/v3/589d74204be04c67abe5a40c4fa361e7 \
//   -X POST \
//   -H "Content-Type: application/json" \
//   -d '{
//     "jsonrpc": "2.0",
//     "method": "eth_blockNumber",
//     "params": [],
//     "id": 1
//   }'

require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  }
};
