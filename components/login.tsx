'use client'
import {usePrivy} from '@privy-io/react-auth';
import {useRouter} from 'next/router';
import {useWallets} from '@privy-io/react-auth';
import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";

export default function LoginButton() {

  const {ready, authenticated, login,user} = usePrivy();
  const disableLogin = !ready || (ready && authenticated);
  const {wallets} = useWallets();

  const switchs=async()=>{
    const wallet = wallets[0];
    const embeddedWallet = wallets.find((wallet) => (wallet.walletClientType === 'privy'));
    console.log(wallet.address)
    await  embeddedWallet?.switchChain(11155111);
    const provider = await wallet.getEthereumProvider();
    const providers = await wallet.getEthersProvider();
    const signer = providers.getSigner();
    const db = new Database({ signer });
    const prefix = "farframe";
    
const { meta: create } = await db
  .prepare(`CREATE TABLE ${prefix} (id integer primary key, stream text,price integer);`)
  .run();
  

  await create.txn?.wait();
 console.log('shikiu ', create.txn?.names)
  const tableName = create.txn?.names[0]
  console.log(tableName)
//   const transactionRequest = {
//     to: '0xA2a9055A014857d6c1e8f1BDD8682B6459C5Fa85',
//     value: 100000,
//   };
//   const transactionHash = await provider.request({
//     method: 'eth_sendTransaction',
//     params: [transactionRequest],
//   });
  }
  const insert=async()=>{
    const wallet = wallets[0];
    const embeddedWallet = wallets.find((wallet) => (wallet.walletClientType === 'privy'));
    console.log(wallet.address)
    await  embeddedWallet?.switchChain(11155111);
    const provider = await wallet.getEthereumProvider();
    const providers = await wallet.getEthersProvider();
    const signer = providers.getSigner();
    const db = new Database({ signer });
    const { meta: insert } = await db
  .prepare(`INSERT INTO farframe_11155111_1391 (id, stream,price) VALUES (?, ?, ?);`)
  .bind(32, "money",10)
  .run();

await insert.txn?.wait();
  }

  const results=async()=>{
    const wallet = wallets[0];
    const embeddedWallet = wallets.find((wallet) => (wallet.walletClientType === 'privy'));
    console.log(wallet.address)
    await  embeddedWallet?.switchChain(11155111);
    const provider = await wallet.getEthereumProvider();
    const providers = await wallet.getEthersProvider();
    const signer = providers.getSigner();
    const db = new Database({ signer });
    const { results } = await db.prepare(`SELECT * FROM farframe_11155111_1391;`).all();
console.log(results);
  }
  return (
    <div>
    {ready && !authenticated && (
      <button disabled={disableLogin} onClick={login}>
        Log in
      </button>
    )}
    {ready && authenticated && (
      <p>User {user?.id} is logged in. {user?.wallet?.address}
      <li>Google: {user?.google ? user?.google.email : 'None'}</li>
      <li>Email: {user?.email ? user?.email.address : 'None'}</li>
      <button onClick={switchs}> switches </button>
      <button onClick={insert}> inserts </button>
      <button onClick={results}> results </button>
      </p>
   
    )}
  </div>
  );
}