const gameAddr = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
const contractName = "Game5";

async function main() {
    const game = await hre.ethers.getContractAt(contractName, gameAddr);

    // give yourself enough allowance first
    await game.giveMeAllowance(10000);

    // then mint using that allowance
    await game.mint(10000);

    // now balance >= 10000, win() should succeed
    const tx = await game.win();

    const receipt = await tx.wait();
    console.log(receipt);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });