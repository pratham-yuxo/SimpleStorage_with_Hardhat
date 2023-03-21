// plugins
require("@nomiclabs/hardhat-waffle")
require("dotenv").config()
// require("hardhat-gas-reporter")
// require("./tasks/block-number")
require("@nomiclabs/hardhat-etherscan")
/** @type import('hardhat/config').HardhatUserConfig */

// type yarn hardhat to know every command of hardhat
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
// here you can specify the version of solidity on which u wanna work
module.exports = {
    //  by default our contract will be deployed on hardhat networks
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {},
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
            // to get chain id of any chain go to chainlist.org
        },
    },
    solidity: "0.8.8",
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
}
