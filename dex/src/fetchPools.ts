import { Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection('https://devnet.helius-rpc.com/?api-key=a1ff3fd7-1ab4-44aa-ad77-8a8a7c0a09b2');
const raydiumV4ProgramId = new PublicKey('675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8');
const accounts = await connection.getProgramAccounts(raydiumV4ProgramId);
console.log(accounts);