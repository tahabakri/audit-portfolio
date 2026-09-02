const gameAddr = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const contractName = "Game2";

async function main() {
    const game = await hre.ethers.getContractAt(contractName, gameAddr);

    // FIRST set x to 30
    await game.setX(30);

    // THEN set y to 20
    await game.setY(20);

    // NOW win() should succeed since x + y == 50
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