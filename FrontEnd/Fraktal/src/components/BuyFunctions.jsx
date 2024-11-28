import { ethers } from "ethers"
import abi from '../Definitivo.json';

export const connectToWallet = async () => {
    if(!window.ethereum) return false;
    const publicKey = await window.ethereum.request({
        "method": "eth_requestAccounts",
        "params": []
    });

    return publicKey;
}

export const buyToken = async (seller, tokenId, amount, price) => {
    if(amount == 0) return {message: "Amount can not be 0", success: false};

    const connect = await connectToWallet()
    if (!connect) return {message: "Please install a wallet", success: false};

    const CONTRACT_ADDRESS = '0xB42A840A256fc60a155922F0Ef4D04d54c426027';

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi['abi'], provider);
    const contractSigner = contract.connect(signer);

    try {
        const tx = await contractSigner.buyTokenWithEther(seller, tokenId, amount, {value: amount * price});
        const receipt = await tx.wait();
    
        if(receipt.status === 1) {
            return {message: "Transacction successful", success: true}
        }
        else { 
            console.log('Transacction failed');
            return {message: "Transacction failed", success: false}
        }

    } catch (error) {
        console.error(`Error in transacction: ${error}`)
        return {message: "Error in transacction", success: false}
    }
}