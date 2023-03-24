// imports
// in this case we are gonna import ethers by hardhat instead of ethers
const { ethers, run, network } = require("hardhat")

// USE yarn hardhat run scripts/deploy.js --network hardhat => we are telling hardhat to deploy our script in hardhat network by default
async function main() {
    // here we can get our solidity code directly
    // however if import ethers by ethers js instead of hardhat then it will not know about the contract folder

    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    // in hh network(fake blockchain) ,we have a rpc url and private key already
    console.log(`Deployed contract to: ${simpleStorage.address}`)

    // what happens when we deploy to our hardhat network?
    console.log(network.config.chainId)
    //  we don't verify in hardhat chain 31337 is the chain id of hardhat etherscan
    // we will only verify if it is sepolia and api key exists
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block confirmations...")
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current Value is: ${currentValue}`)

    // Update the current value
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated Value is: ${updatedValue}`)

    // ***         verifying and publiching
    //  do yarn hardhat to see all functios verify is one of them
    async function verify(contractAddress, args) {
        const verify = async (contractAddress, args) => {
            console.log("Verifying contract...")
            try {
                // here we are running that hardhat verify command from terminal
                //  we can do this in terminal too  but we are  making a function here
                await run("verify:verify", {
                    address: contractAddress,
                    constructorArguments: args,
                })
            } catch (e) {
                if (e.message.toLowerCase().includes("already verified")) {
                    console.log("Already Verified!")
                } else {
                    console.log(e)
                }
            }
        }
    }
}

// main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
// api key => BDUEFB2K566FCDU6W4K14868B2PZCT3U1V
// yarn hardhat clean
