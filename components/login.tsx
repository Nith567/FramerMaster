'use client'
import {usePrivy} from '@privy-io/react-auth';
import {useWallets} from '@privy-io/react-auth';
import { Database } from "@tableland/sdk";
import { useState } from 'react';
import { ethers } from 'ethers';
import { useRouter } from 'next/navigation'
import { deployContract } from '@/lib/deploy'
export default function LoginButton() {

  const {ready, authenticated, login,user} = usePrivy();
  const disableLogin = !ready || (ready && authenticated);
  const {wallets} = useWallets();
  const [creator, setCreator] = useState('');
  const [title, setTitle] = useState('');
  const [contract, setContract] = useState('');
  const [table, setTableName] = useState('');
  const [streamId, setStreamId] = useState('');
  const [metadata, setMetadata] = useState('');
  const [price, setPrice] = useState('');

  const router = useRouter()

//   const switchs=async()=>{
//     const wallet = wallets[0];
//     const embeddedWallet = wallets.find((wallet) => (wallet.walletClientType === 'privy'));
//     console.log(wallet.address)
//     await  embeddedWallet?.switchChain(11155111);
//     const provider = await wallet.getEthereumProvider();
//     const providers = await wallet.getEthersProvider();
//     const signer = providers.getSigner();
//     const db = new Database({ signer });
//     const prefix = "farframe";
    
// const { meta: create } = await db
//   .prepare(`CREATE TABLE ${prefix} (id integer primary key,creator text,address text,contract text, title text, streamId text,metadata text,price integer);`)
//   .run();
  
//   await create.txn?.wait();
//  console.log('shikiu ', create.txn?.names)
//   const tableName = create.txn?.names[0]
//   console.log(tableName)
// //   const transactionRequest = {
// //     to: '0xA2a9055A014857d6c1e8f1BDD8682B6459C5Fa85',
// //     value: 100000,
// //   };
// //   const transactionHash = await provider.request({
// //     method: 'eth_sendTransaction',
// //     params: [transactionRequest],
// //   });
//   }

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    const wallet = wallets[0];
    const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');
    if (!embeddedWallet) {
      console.error('Embedded wallet not found');
      return;
    }
    try {
      await embeddedWallet.switchChain(11155111);
      const provider = await embeddedWallet.getEthereumProvider();
      const providers = await embeddedWallet.getEthersProvider();
      const signer = providers.getSigner();
      const db = new Database({ signer });
      const prefix = "farframe";
    
      const { meta: create } = await db
        .prepare(`CREATE TABLE ${prefix} (id integer primary key,creator text,address text,contract text, title text, streamId text,metadata text,price integer);`)
        .run();
        
        await create.txn?.wait();
        let tableName = create.txn?.names[0]

      const priceWei = ethers.utils.parseEther(price).toString();
     let contract=  await deployContract(signer, streamId, priceWei);
      setContract(contract.address);
      console.log(contract.address,contract)

      const { meta: insert } = await db
        .prepare(`INSERT INTO ${tableName} (creator,address,contract, title, streamId, metadata, price) VALUES (?, ?, ?, ?, ?, ?, ?)`)
        .bind(`${user?.id.split(":").at(2)}`,`${user?.wallet?.address}`,`${contract.address}`,title ,streamId, metadata, price)
        .run();

      await insert.txn?.wait();
      console.log(insert.txn?.names)
      console.log('Data inserted successfully');
  let p=user?.id.split(":").at(2)

  router.push(`/watch/${tableName}-${contract.address}`)
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div>
    {ready && !authenticated && (
      <button disabled={disableLogin} onClick={login}>
        Log in
      </button>
    )}
    {ready && authenticated && (
        <div>
      <p>User {user?.id} is logged in. {user?.wallet?.address}
      <li>Google: {user?.google ? user?.google.email : 'None'}</li>
      <li>Email: {user?.email ? user?.email.address : 'None'}</li>
      </p>
      <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium text-gray-700">Title</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="streamId" className="block font-medium text-gray-700">Stream ID</label>
          <input type="text" id="streamId" value={streamId} onChange={(e) => setStreamId(e.target.value)} className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="metadata" className="block font-medium text-gray-700">Metadata</label>
          <input type="text" id="metadata" value={metadata} onChange={(e) => setMetadata(e.target.value)} className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div>
          <label htmlFor="price" className="block font-medium text-gray-700">Price</label>
          <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">Submit</button>
      </form>
    </div>
   </div>
    )}
  </div>
  );
}