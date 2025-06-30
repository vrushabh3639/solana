// calculate transaction cost
import { ComputeBudgetProgram, Connection, Keypair, SystemProgram, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import fs from "fs";
const connection = new Connection("https://devnet.helius-rpc.com/?api-key=a1ff3fd7-1ab4-44aa-ad77-8a8a7c0a09b2", "confirmed");
const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
const keypairPath = 'D:/keypair.json';
const data = await fs.promises.readFile(keypairPath, 'utf8');
const secretKey = Uint8Array.from(JSON.parse(data));
const sender = Keypair.fromSecretKey(secretKey);
const recipient = Keypair.generate();
const transferInstruction = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: recipient.publicKey,
    lamports: 1000000
});
// create simulation instructions with placeholder compute unit limit
const simulationInstruction = [
    ComputeBudgetProgram.setComputeUnitLimit({
        units: 1400000 // high value for simulation
    }),
    ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 1n
    }),
    transferInstruction
];
// create transaction for simulation
const simulationTransaction = new VersionedTransaction(new TransactionMessage({
    instructions: simulationInstruction,
    payerKey: sender.publicKey,
    recentBlockhash: blockhash
}).compileToV0Message());
// simulate transaction to get compute unit estimate
const simulationResponse = await connection.simulateTransaction(simulationTransaction);
const estimatedUnits = simulationResponse.value.unitsConsumed;
console.log(`Estimated compute units: ${estimatedUnits}`);
// create final transaction with compute budget instructions
const computeUnitLimitInstruction = ComputeBudgetProgram.setComputeUnitLimit({
    units: estimatedUnits
});
const computeUnitPriceInstruction = ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: 1n
});
// build transaction with all instructions
const messageV0 = new TransactionMessage({
    payerKey: sender.publicKey,
    recentBlockhash: blockhash,
    instructions: [
        computeUnitPriceInstruction,
        computeUnitLimitInstruction,
        transferInstruction
    ]
}).compileToV0Message();
// calculate fee
const fees = await connection.getFeeForMessage(messageV0);
console.log(`Transaction fee: ${fees.value} lamports`);
const transaction = new VersionedTransaction(messageV0);
transaction.sign([sender]);
// send and confirm transaction
const signature = await connection.sendTransaction(transaction);
console.log(`Transaction Signature: ${signature}`);
