const { task } = require("hardhat/config")

//  name , description
task("block-number", "Prints the current block number").setAction(
    // const blockTask = async function() => {}
    // async function blockTask() {}
    // hre can access all the imports or requires that we did in deploy.js

    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number: ${blockNumber}`)
    }
)

module.exports = {}
