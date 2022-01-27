import { ThirdwebSDK } from "@3rdweb/sdk";
import ethers from "ethers";

//importing and configuring my .env file
import dotenv from "dotenv";
dotenv.config();

// quick checks if .env is working
if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY == "") {
  console.log("Private key not found");
}
if (!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL == "") {
  console.log("Alchemy url not found");
}
if (!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS == "") {
  console.log("wallet address not found");
}

const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    // your wallet private key
    process.env.PRIVATE_KEY,
    //RPC url, we'll use Alchemy key here
    ethers.getDefaultProvider(process.env.ALCHEMY_API_URL)
  )
);

(async () => {
  try {
    const apps = await sdk.getApps();
    console.log("your app address is:", apps[0].address);
  } catch (err) {
    console.error("failed to get apps from sdk", err);
    process.exit(1);
  }
})();

// we are exporting the initialized thirdweb SDK so that we can use it in our other scripts
export default sdk;
