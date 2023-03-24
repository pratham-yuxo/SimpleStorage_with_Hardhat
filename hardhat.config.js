// plugins
require("@nomiclabs/hardhat-waffle") //
require("dotenv").config()
require("hardhat-gas-reporter")
require("./tasks/block-number")
require("@nomiclabs/hardhat-etherscan")
//  yarn hardhat coverage = this will go through our test and tells how many of line of.sol id covered in a test
require("solidity-coverage")
/** @type import('hardhat/config').HardhatUserConfig */

// type yarn hardhat to know every command of hardhat
const SEPOLIA_RPC_URL =
    process.env.SEPOLIA_RPC_URL || "https://hardhatkonarajnikrna"
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
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
        //  yarn hardhat node => to set up a ganache like server in our local environment but it will not have a hard hat network so we are making our own network
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
    },
    solidity: "0.8.8",
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        // will run whenever we run task
        enable: true,
        outputFile: "gasReport.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
    },
}
// 9 23
