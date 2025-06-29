// connecting to rpc
// import { Connection } from "@solana/web3.js";

// const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// also can be done using the network name
// import { clusterApiUrl, Connection } from "@solana/web3.js";

// const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// getting test sol using airdrop

import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";

const connection = new Connection("https://devnet.helius-rpc.com/?api-key=a1ff3fd7-1ab4-44aa-ad77-8a8a7c0a09b2", "confirmed");

const secret = Uint8Array.from([230,248,94,148,135,166,188,48,121,6,88,255,169,178,143,183,144,16,219,199,34,74,82,158,41,38,166,141,135,219,217,102,5,218,235,47,204,141,227,100,228,27,57,48,228,195,94,242,93,8,195,49,35,239,220,24,246,82,117,205,216,70,248,196])
const wallet = Keypair.fromSecretKey(secret);

const signature = await connection.requestAirdrop(
    wallet.publicKey,
    LAMPORTS_PER_SOL
);

const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

await connection.confirmTransaction({
    blockhash,
    lastValidBlockHeight,
    signature
});

const balance = await connection.getBalance(wallet.publicKey);
console.log(`Balance: ${balance / LAMPORTS_PER_SOL} SOL`);