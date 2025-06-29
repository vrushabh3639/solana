// connecting to rpc
// import { Connection } from "@solana/web3.js";
// const connection = new Connection("https://api.devnet.solana.com", "confirmed");
// also can be done using the network name
// import { clusterApiUrl, Connection } from "@solana/web3.js";
// const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
// getting test sol using airdrop
import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
const connection = new Connection("https://devnet.helius-rpc.com/?api-key=a1ff3fd7-1ab4-44aa-ad77-8a8a7c0a09b2", "confirmed");
const secret = Uint8Array.from([ /* I leave my pvt key here and pushed this to github lol */]);
const wallet = Keypair.fromSecretKey(secret);
const signature = await connection.requestAirdrop(wallet.publicKey, LAMPORTS_PER_SOL);
const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
await connection.confirmTransaction({
    blockhash,
    lastValidBlockHeight,
    signature
});
const balance = await connection.getBalance(wallet.publicKey);
console.log(`Balance: ${balance / LAMPORTS_PER_SOL} SOL`);
