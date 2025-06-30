// send sol

import {
    Connection,
    Keypair,
    SystemProgram,
    LAMPORTS_PER_SOL,
    Transaction,
    sendAndConfirmTransaction
} from "@solana/web3.js"
import fs from "fs";

const connection = new Connection("https://devnet.helius-rpc.com/?api-key=a1ff3fd7-1ab4-44aa-ad77-8a8a7c0a09b2", "confirmed");

const keypairPath = 'D:/keypair.json';

const data = await fs.promises.readFile(keypairPath, 'utf8');
const secretKey = Uint8Array.from(JSON.parse(data));
const fromKeypair = Keypair.fromSecretKey(secretKey);

const toKeypair = Keypair.generate();

// const airdropSignature = await connection.requestAirdrop(
//     fromKeypair.publicKey,
//     LAMPORTS_PER_SOL
// );

// await connection.confirmTransaction(airdropSignature)

const lamportsToSend = 1_000_000;

const transferTransaction = new Transaction().add(
    SystemProgram.transfer({
        fromPubkey: fromKeypair.publicKey,
        toPubkey: toKeypair.publicKey,
        lamports: lamportsToSend
    })
);

const signature = await sendAndConfirmTransaction(
    connection,
    transferTransaction,
    [fromKeypair]
);
console.log("Transaction Signature:", signature);
