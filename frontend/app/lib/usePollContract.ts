"use client";

import { useEffect } from "react";
import { useReadContract } from "wagmi";
import { Abi } from "viem";

type UsePollContractOptions = {
  address: `0x${string}`;
  abi: Abi;
  functionName: string;
  args?: readonly unknown[];
  pollInterval?: number;
};

export function usePollContract<TData = unknown>({
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
    refetch: () => Promise<{ data: TData | undefined }>;
    isLoading: boolean;
    isError: boolean;
    error: unknown;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, pollInterval);

    return () => clearInterval(interval);
  }, [refetch, pollInterval]);

  return { data, isLoading, isError, error };
}
