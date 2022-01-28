import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// this is our governance contract.

const voteModule = sdk.getVoteModule(
  "0xB998d77F182222344d584b7a3B19b25d2735E273"
);

// this is our ERC-20 contract.
const tokenModule = sdk.getTokenModule(
  "0xFF4714AEa7D2CE3358ec45f40fB35A6bc2A0a40B"
);

(async () => {
  try {
    // give our treasury the power to mint additional token if needed.
    await tokenModule.grantRole("minter", voteModule.address);

    console.log(
      "Successfully gave vote module permission to act on token module"
    );
  } catch (error) {
    console.error(
      "failed to grant vote module permission on token module",
      error
    );
    process.exit(1);
  }

  try {
    // Grab our wallets token balance, remember -- we hold basically the entire supply right now
    const ownedTokenBalance = await tokenModule.balanceOf(
      // the wallet address stored in your env file
      process.env.WALLET_ADDRESS
    );

    // grab 90% of the supply that we hold.
    const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
    const percent90 = ownedAmount.div(100).mul(90);

    //Transfer 90% of the supply to our voting contract.
    await tokenModule.transfer(voteModule.address, percent90);

    console.log("✅ Successfully transferred tokens to vote module");
  } catch (err) {
    console.error("failed to transfer tokens to vote module", err);
  }
})();
