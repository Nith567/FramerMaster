import { ethers } from "ethers";
import { frameContract } from '../contract/frame';

export async function deployContract(signer:any, playbackId:any, price:any) {
    
    const factory = new ethers.ContractFactory(
        frameContract.abi,
        frameContract.bytecode,
        signer
    );
    const contract = await factory.deploy(playbackId, price); 
    console.log("Deploying contract...", playbackId, price);
    await contract.deployed();
    console.log("deployed contract...", contract.address);
    return contract;
}

export async function purchaseContract(signer:any, contractAddress:any, price:any) {
    const contract = new ethers.Contract(
        contractAddress,
        frameContract.abi,
        signer
    );
    const tx = await contract.purchaseAccess({ value: price });
    await tx.wait();
    console.log("Purchased contract...", tx);
    const result = await contract.purchaseAccess.call();
    return {playbackId: result};
}