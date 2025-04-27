"use client";

import { useWriteContracts } from "wagmi/experimental";
import { useState } from "react";
import { useContractCapabilities } from "./capabilities";
import { abi } from "../abi";
import { useWriteContract } from "wagmi";

interface ContractCallParams {
  functionName: string;
  args: any[];
  value?: bigint; // optional ETH to send
}

export function useContractCall() {
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState({});

  const { writeContracts } = useWriteContracts({
    mutation: {
      onSuccess: (responseData) => {
        setSuccess(true);
        console.log("Transaction successful:", responseData);
        setData(responseData);
      },
      onError: (error) => {
        console.error("Transaction failed:", error);
      },
    },
  });

  const { writeContractAsync } = useWriteContract();
  const capabilities = useContractCapabilities();

  const callContract = async ({ functionName, args, value }: ContractCallParams) => {
    try {
      if (value) {
        // If ETH value is passed, use writeContractAsync
        const tx = await writeContractAsync({
          address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
          abi,
          functionName,
          args,
          value,
        });
        console.log("Transaction with value successful:", tx);
        setSuccess(true);
        setData(tx);
      } else {
        // Otherwise, use paymaster-capable writeContracts
        if (capabilities) {
          await writeContracts({
            contracts: [
              {
                address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
                abi,
                functionName,
                args,
              },
            ],
            capabilities,
          });
        } else {
          console.error("Capabilities not available");
        }
      }
    } catch (error) {
      console.error("Transaction error:", error);
      setSuccess(false);
    }
  };

  return { callContract, success, data };
}
