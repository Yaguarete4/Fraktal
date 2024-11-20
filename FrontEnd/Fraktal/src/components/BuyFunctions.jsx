import { ethers } from "ethers"
import abi from '../Definitivo.json';

export const connectToWallet = async () => {
    if(!window.ethereum) return {message: "Please install a wallet", success: false};
    await window.ethereum.send("eth_requestAccounts");

    return {message: "Success", success: true};
}

export const buyToken = async (seller, tokenId, amount, price) => {
    if(amount == 0) return {message: "Amount can not be 0", success: false}

    const connect = await connectToWallet()
    if (!connect.success) return connect

    const CONTRACT_ADDRESS = '0xb464931bBD82F8Ce7301FE4fD067e87613684522';

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