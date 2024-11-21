const EtherTransfer = artifacts.require("EtherTransfer");

module.exports = async function (deployer) {
  await deployer.deploy(EtherTransfer);
};
