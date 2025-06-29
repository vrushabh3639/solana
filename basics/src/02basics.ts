import fs from "fs";
import { Keypair } from "@solana/web3.js";

const keypairPath = 'D:/keypair.json';

const data = await fs.promises.readFile(keypairPath, 'utf8');
const secretKey = Uint8Array.from(JSON.parse(data));
const keypair = Keypair.fromSecretKey(secretKey);

console.log("Public Key:", keypair.publicKey.toBase58());