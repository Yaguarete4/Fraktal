// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
//GITHUB: @tute978 - @Yaguarete4
pragma solidity >=0.8.0 <0.9.0;


import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
// To use modifier nonReentrant, this prevents the function from executing more from 2 times
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
//converts variable type to string
import "@openzeppelin/contracts/utils/Strings.sol";

contract Definitivo is ERC1155, ERC1155Burnable, ERC1155Supply, ReentrancyGuard {
    
    address public ownerOfContract;
    mapping(uint256 id => uint256) private _prices;
    // variable que vincule id del token con el precio
    // funcion que permita modificar el valor del token

    receive() external payable{}

    constructor() ERC1155("https://ipfs.io/ipfs/Qmc61UdkuBMDsNDRJ3CKJTMVKRWzihGQBDfkrmXCEGghEc/{id}.json") {
        ownerOfContract = msg.sender;
    }
 
    modifier onlyOwners()  {
        require(msg.sender == ownerOfContract, "Not Owner");
        _;
    }

    event TokenSold(
        address indexed seller,
        address indexed buyer,
        uint256 indexed tokenId,
        uint256 amount,
        uint256 price
    );

    function setURI(string memory newuri) public onlyOwners {
        _setURI(newuri);
    }

    // Agregamos price al mintear un token
    function mint(address account, uint256 id, uint256 amount, uint256 price, bytes memory data)
        public
        onlyOwners
    {
        _mint(account, id, amount, data);
        _prices[id] = price;
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

    function _updatePrice(uint256 tokenId, uint256 price) public returns (uint256) {
        _prices[tokenId] = price;
        return _prices[tokenId];
    }

    function getDynamicPrice(uint256 tokenId) public returns (uint256) {
        uint256 supply = totalSupply(tokenId); 
        uint256 basePrice = 1 ether;
        uint256 dynamicPrice = basePrice + (1 ether * (1000 - supply) / 1000);
        _prices[tokenId] = dynamicPrice;
        return dynamicPrice;
    }

    //Falta analizar
    function buyTokenWithEther(address seller, uint256 tokenId, uint256 amount) external payable nonReentrant {
        uint256 price = msg.value;  // Precio pagado en Ether
        uint256 tokenPrice = _prices[tokenId] * amount;
        require(price >= tokenPrice, "Fondos insuficientes");
        require(balanceOf(seller, tokenId) >= amount, "El vendedor no tiene suficientes tokens");

        // Transferir los tokens del vendedor al comprador (msg.sender)
        _safeTransferFrom(seller, msg.sender, tokenId, amount, "");

        // Enviar los Ether al vendedor
        (bool success, ) = payable(seller).call{value: tokenPrice}("");
        require(success, "Transferencia de Ether fallida");

        emit TokenSold(seller, msg.sender, tokenId, amount, price);
    }


    function uri (uint _tokenId) override public pure returns (string memory){
        return string(
            abi.encodePacked(
                "https://ipfs.io/ipfs/Qmc61UdkuBMDsNDRJ3CKJTMVKRWzihGQBDfkrmXCEGghEc/",
                Strings.toString(_tokenId),
                ".json"
            )
        );
    }
}