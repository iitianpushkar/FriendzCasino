"use client";

import {ethers} from "ethers";
import abi from "./abi.json";

const provider = new ethers.WebSocketProvider(process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL as string); 
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
export const contract = new ethers.Contract(contractAddress, abi, provider);

