// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract MyToken is ERC1155, Ownable, ERC1155Burnable, ERC1155Supply {
    
    address public ownerOfContract;
    address public FraktalAccount = 0x6Fdc66cf1c2D108e3eAe95DfBa6FeffCcF90F932;

    constructor(address initialOwner) ERC1155("") Ownable(initialOwner) {
        ownerOfContract = msg.sender;
    }

    modifier onlyOwners()  {
        require(msg.sender == ownerOfContract || msg.sender == FraktalAccount, "Not Owner");
        _;
    }

    function setURI(string memory newuri) public onlyOwners {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwners
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwners
    {
        _mintBatch(to, ids, amounts, data);
    }

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256[] memory ids, uint256[] memory values)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._update(from, to, ids, values);
    }
    // string public name = "Token Fraktal";
    // string public symbol = "FRK";

    // uint256 public totalSupply = 1000000;,

    // function crearTokens()
}