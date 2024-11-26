const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const DefinitivoModule = buildModule("DefinitivoModule", (m) => {


  const DefinitivoContract = m.contract("Definitivo");

  return { DefinitivoContract };
});

module.exports = DefinitivoModule;