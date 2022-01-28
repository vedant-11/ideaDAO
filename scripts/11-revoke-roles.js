import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule(
  "0xFF4714AEa7D2CE3358ec45f40fB35A6bc2A0a40B"
);

(async () => {
  try {
    // log the current roles.
    console.log(
      "👀 Roles that exist right now:",
      await tokenModule.getAllRoleMembers()
    );

    // Revoke all the superpowers your wallet had over the ERC-20 contract.
    await tokenModule.revokeAllRolesFromAddress(process.env.WALLET_ADDRESS);
    console.log(
      "🎉 Roles after revoking ourselves",
      await tokenModule.getAllRoleMembers()
    );
    console.log(
      "✅ Successfully revoked our superpowers from the ERC-20 contract"
    );
  } catch (error) {
    console.error("Failed to revoke our superpowers from ERC-20 token", error);
  }
})();
