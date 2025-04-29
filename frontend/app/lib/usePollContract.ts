"use client";

import { useEffect } from "react";
import { useReadContract } from "wagmi";
import { Abi } from "viem";

type UsePollContractOptions = {
  address: `0x${string}`;
  abi: Abi;
  functionName: string;
  args?: any[];
  pollInterval?: number; // default 5000ms
};

export function usePollContract<TData = any>({
  address,
  abi,
  functionName,
  args = [],
  pollInterval = 1000,
}: UsePollContractOptions) {
  const {
    data,
    refetch,
    isLoading,
    isError,
    error,
  } = useReadContract({
    address,
    abi,
    functionName,
    args,
  }) as {
    data: TData;
    refetch: () => Promise<any>;
    isLoading: boolean;
    isError: boolean;
    error: any;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, pollInterval);

    return () => clearInterval(interval);
  }, [refetch, pollInterval]);

  return { data, isLoading, isError, error };
}
