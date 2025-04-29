"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "./abi.json";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
const alchemyWss = process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL!;

export function useContract() {
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    const provider = new ethers.WebSocketProvider(alchemyWss);
    const instance = new ethers.Contract(contractAddress, abi, provider);
    setContract(instance);
  }, []);

  return contract;
}
