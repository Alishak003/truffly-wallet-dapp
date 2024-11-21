const EtherTransfer = artifacts.require("EtherTransfer");
const { assert } = require("assert");

contract("EtherTransfer", (accounts) => {
  let etherTransfer;

  const [deployer, recipient] = accounts;

  beforeEach(async () => {
    etherTransfer = await EtherTransfer.new(); // Deploy a new instance of EtherTransfer contract before each test
  });

  it("should deploy the contract and set initial balance to 0", async () => {
    const contractBalance = await etherTransfer.getBalance();
    assert.equal(contractBalance.toString(), 0);
  });

  it("should receive Ether and update contract balance", async () => {
    // Sending 1 ETH to the contract
    const sendAmount = web3.utils.toWei("1", "ether");

    await etherTransfer.sendEther(deployer, {
      from: deployer,
      value: sendAmount,
    });

    const contractBalance = await etherTransfer.getBalance();
    assert.equal(contractBalance.toString(), sendAmount);
  });

  it("should send Ether from the contract to a recipient", async () => {
    // Sending 1 ETH to the contract
    const sendAmount = web3.utils.toWei("1", "ether");
    await etherTransfer.sendEther(deployer, {
      from: deployer,
      value: sendAmount,
    });

    // Check initial balance of recipient
    const initialRecipientBalance = await web3.eth.getBalance(recipient);

    // Send Ether from contract to recipient
    const sendAmountToRecipient = web3.utils.toWei("0.5", "ether");
    await etherTransfer.sendEther(recipient, {
      from: deployer,
      value: sendAmountToRecipient,
    });

    // Check recipient balance after transaction
    const finalRecipientBalance = await web3.eth.getBalance(recipient);
    const finalRecipientBalanceInWei = web3.utils.toBN(finalRecipientBalance);
    const expectedRecipientBalance = web3.utils
      .toBN(initialRecipientBalance)
      .add(web3.utils.toBN(sendAmountToRecipient));

    assert.equal(
      finalRecipientBalanceInWei.toString(),
      expectedRecipientBalance.toString()
    );
  });

  it("should emit the EtherSent event when Ether is sent", async () => {
    const sendAmount = web3.utils.toWei("1", "ether");

    const tx = await etherTransfer.sendEther(recipient, {
      from: deployer,
      value: sendAmount,
    });

    // Check that the event was emitted
    assert.equal(tx.logs.length, 1); // Ensure there's 1 log
    assert.equal(tx.logs[0].event, "EtherSent"); // Ensure the event name is EtherSent
    assert.equal(tx.logs[0].args.sender, deployer); // Check the sender
    assert.equal(tx.logs[0].args.recipient, recipient); // Check the recipient
    assert.equal(tx.logs[0].args.amount.toString(), sendAmount); // Check the amount sent
  });

  it("should fail if recipient address is invalid", async () => {
    const sendAmount = web3.utils.toWei("1", "ether");

    try {
      await etherTransfer.sendEther(
        "0x0000000000000000000000000000000000000000",
        { from: deployer, value: sendAmount }
      );
      assert.fail("The transaction should have failed with an invalid address");
    } catch (error) {
      assert(error.message).to.include("Invalid recipient address");
    }
  });

  it("should fail if no Ether is sent", async () => {
    try {
      await etherTransfer.sendEther(recipient, { from: deployer, value: 0 });
      assert.fail(
        "The transaction should have failed because no Ether was sent"
      );
    } catch (error) {
      assert(error.message).to.include("Must send more than 0 ETH");
    }
  });
});
