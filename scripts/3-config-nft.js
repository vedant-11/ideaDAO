import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0x265Dde60F79E310deA14bfd8898E2A1716D4331d"
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Creator's card",
        description: "This NFT will give you access to ideaDAO!",
        image: readFileSync("scripts/assets/memberDAO.jpg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();
