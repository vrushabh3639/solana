// keypair from a file
import fs from "fs";
import { Keypair } from "@solana/web3.js";
const keypairPath = 'D:/keypair.json';
const data = await fs.promises.readFile(keypairPath, 'utf8');
const secretKey = Uint8Array.from(JSON.parse(data));
const keypair = Keypair.fromSecretKey(secretKey);
// console.log("Public Key:", keypair.publicKey.toBase58());
// verify a keypair
// import { Keypair, PublicKey } from "@solana/web3.js";
const publicKey = new PublicKey("PremxWSjbuD1S7cVwnWpWGE3byxYRuP55rfKvtR17i3");
// keypair is declared above
// console.log(keypair.publicKey.toBase58() === publicKey.toBase58());
// validate a public key
import { PublicKey } from "@solana/web3.js";
// on curve address
const key = new PublicKey("PremxWSjbuD1S7cVwnWpWGE3byxYRuP55rfKvtR17i3");
console.log(`isOnCurve: ${PublicKey.isOnCurve(key.toBytes())}`);
