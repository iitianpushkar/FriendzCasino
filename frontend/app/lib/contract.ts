import {
    createThirdwebClient,
    getContract,
  } from "thirdweb";
  import { defineChain } from "thirdweb/chains";
  
  // create the client with your clientId, or secretKey if in a server environment
  const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
  });
  
  // connect to your contract
  export const contract = getContract({
    client,
    chain: defineChain(84532),
    address: "0xCA19409a1B7B35780AF2555A37d99fe10D609db0",
  });
  