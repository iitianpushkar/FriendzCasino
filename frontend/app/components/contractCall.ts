"use client";

import { useWriteContracts } from "wagmi/experimental";
import { useContractCapabilities } from "./capabilities";
import { abi } from "../abi";
import { useWriteContract } from "wagmi";

interface ContractCallParams {
  functionName: string;
  args: unknown[];
  value?: bigint;
}

export function useContractCall() {


  const { writeContractsAsync } = useWriteContracts({
    mutation: {
      onSuccess: () => {
        console.log("Transaction successful");
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

        return tx;
        
      } else {
        // Otherwise, use paymaster-capable writeContracts
        if (capabilities) {
         const tx = await writeContractsAsync({
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

          return tx;
        } else {
          console.error("Capabilities not available");
        }
      }
    } catch (error) {
      console.error("Transaction error:", error);
    }
  };

  return { callContract };
}
