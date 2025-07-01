import {
    Connection,
    SystemProgram,
    Transaction,
    sendAndConfirmTransaction,
    clusterApiUrl,
    Keypair
} from "@solana/web3.js";
import fs from "fs";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const keypairPath = 'D:/keypair.json';

const data = await fs.promises.readFile(keypairPath, 'utf8');
const secretKey = Uint8Array.from(JSON.parse(data));
const fromKeypair = Keypair.fromSecretKey(secretKey);

const newAccount = Keypair.generate();

// amount of space to reserve for the account
const space = 0;

// Seed the created account with lamports for rent exemption
const rentLamports = await connection.getMinimumBalanceForRentExemption(space);

const createAccountTransaction = new Transaction().add(
    SystemProgram.createAccount({
        fromPubkey: fromKeypair.publicKey,
        newAccountPubkey: newAccount.publicKey,
        lamports: rentLamports,
        space,
        programId: SystemProgram.programId
    })
);

const signature = await sendAndConfirmTransaction(
    connection,
    createAccountTransaction,
    [fromKeypair, newAccount]
);

console.log("Transaction Signature: ", signature);
