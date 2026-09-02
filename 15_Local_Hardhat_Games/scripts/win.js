const gameAddr = "0x0165878A594ca255338adfa4d48449f69242Eb8F";
const contractName = "Game3";

async function main() {
    const game = await hre.ethers.getContractAt(contractName, gameAddr);

    // Game3 needs ONE argument passed directly into win()
    // y is always 210, so we pass 45: 45 + 210 = 255
    const tx = await game.win(45);

    const receipt = await tx.wait();
    console.log(receipt);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });