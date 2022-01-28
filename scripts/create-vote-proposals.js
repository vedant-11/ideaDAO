import dotenv from "dotenv";
import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

dotenv.config();

if (!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS == "") {
  throw new Error("🛑 Wallet address not found.");
}

const voteModule = sdk.getVoteModule(
  "0xB998d77F182222344d584b7a3B19b25d2735E273"
);
const tokenModule = sdk.getTokenModule(
  "0xFF4714AEa7D2CE3358ec45f40fB35A6bc2A0a40B"
);

(async () => {
  try {
    await tokenModule.delegateTo(process.env.WALLET_ADDRESS);
    const amount = 12345;
    await voteModule.propose(
      "Should the DAO invest  " +
        amount +
        " in idea related to solidification of carbondioxide from atmosphere  ",
      [
        {
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            "mint",
            [voteModule.address, ethers.utils.parseUnits(amount.toString(), 18)]
          ),
          toAddress: tokenModule.address,
        },
      ]
    );

    console.log("✅ Successfully created proposal to mint tokens");
  } catch (error) {
    console.error("failed to create first proposal", error);
    process.exit(1);
  }

  try {
    const amount = 69420;
    await voteModule.propose(
      "Should the DAO transfer " +
        amount +
        " tokens from the treasury to " +
        process.env.WALLET_ADDRESS +
        " for idea related to biodegradable caps",
      [
        {
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            "transfer",
            [
              process.env.WALLET_ADDRESS,
              ethers.utils.parseUnits(amount.toString(), 18),
            ]
          ),

          toAddress: tokenModule.address,
        },
      ]
    );

    console.log(
      "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
    );
  } catch (error) {
    console.error("failed to create first proposal", error);
  }
})();
