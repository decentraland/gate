const Invite = artifacts.require("DecentralandInvite");

describe("Invite contract", () => {
  it("Should return the right greeting", async () => {
    const invite = await Invite.new();
  });
});
