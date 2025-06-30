// add memo to a transaction
import { 
    Connection,
    Keypair,
    Transaction,
    sendAndConfirmTransaction
} from "@solana/web3.js";
import { createMemoInstruction } from "@solana/spl-memo"
import fs from "fs";

const connection = new Connection("https://devnet.helius-rpc.com/?api-key=a1ff3fd7-1ab4-44aa-ad77-8a8a7c0a09b2", "confirmed");

const keypairPath = 'D:/keypair.json';

const data = await fs.promises.readFile(keypairPath, 'utf8');
const secretKey = Uint8Array.from(JSON.parse(data));
const feePayer = Keypair.fromSecretKey(secretKey);

// create a memo instruction
const memoInstruction = createMemoInstruction("Hello, world!");

// create transaction and add the memo instruction
const transaction = new Transaction().add(memoInstruction);

// sign and send transaction
const transactionSignature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [feePayer]
);
console.log("Transaction Signature: ", transactionSignature);
