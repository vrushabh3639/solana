import {
  ComputeBudgetProgram,
  Connection,
  Keypair,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction
} from "@solana/web3.js";
import fs from "fs";

// Create connection
const connection = new Connection("https://devnet.helius-rpc.com/?api-key=a1ff3fd7-1ab4-44aa-ad77-8a8a7c0a09b2", "confirmed");

const keypairPath = 'D:/keypair.json';

const data = await fs.promises.readFile(keypairPath, 'utf8');
const secretKey = Uint8Array.from(JSON.parse(data));
const sender = Keypair.fromSecretKey(secretKey);
const recipient = Keypair.generate();

// Create instructions
const instructions = [
  // Set compute unit limit (1M units)
  ComputeBudgetProgram.setComputeUnitLimit({
    units: 1000000
  }),
  // Set priority fee (1 microLamports per compute unit)
  ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: 1
  }),
  // Transfer 0.01 SOL
  SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: recipient.publicKey,
    lamports: 10000000
  })
];

// Get latest blockhash for transaction
const latestBlockhash = await connection.getLatestBlockhash();

// Create transaction using modern VersionedTransaction
const messageV0 = new TransactionMessage({
  payerKey: sender.publicKey,
  recentBlockhash: latestBlockhash.blockhash,
  instructions
}).compileToV0Message();

const transaction = new VersionedTransaction(messageV0);
transaction.sign([sender]);

// Send and confirm transaction
const transactionSignature = await connection.sendTransaction(transaction);
console.log(`Transaction Signature: ${transactionSignature}`);