import axios from "axios";
import {ethers} from 'ethers'
export async function checkBuyer(
   contractAddress:string,
    userAddresses: string[]
  ) {
    try   
    {
        
const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/wqf-6tD6w_KE4FiYQNOvTD8skfQVMN8S'); 

const contractABI = ["function hasAccessed(address _buyer) public returns (uint256)"];
const contract = new ethers.Contract(contractAddress, contractABI, provider);

const results = await Promise.all(userAddresses.map(async (address) => {
  try {
    const result = await contract.hasAccessed(address);
    return result.toNumber() === 1; // Return true if result is 1, false otherwise
  } catch (error) {
    console.error(`Error checking address ${address}:`, error);
    return false; // Return false for addresses with errors
  }
}));

return results.includes(true); // Return true if any result is true, otherwise false
} catch (error) {
console.error('Error:', error);
return false; // Return false in case of error
}
}