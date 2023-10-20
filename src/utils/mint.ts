import {
  CURRENT_CHAIN,
  MINTER_ABI,
  MINTER_ADDRESS,
  PRIVATE_KEY,
} from "../constants";
import { Address, createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";

export async function mint(to: Address, tokenURI: string) {
  if (!PRIVATE_KEY) {
    throw new Error("No Private Key found. Check your environment");
  }

  try {
    const account = privateKeyToAccount(PRIVATE_KEY as any);

    const walletClient = createWalletClient({
      account,
      chain: CURRENT_CHAIN,
      transport: http(),
    });

    const result = await walletClient.writeContract({
      abi: MINTER_ABI,
      address: MINTER_ADDRESS,
      functionName: "mint",
      args: [to, tokenURI],
    });
    console.log("Result of Mint", result);

    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getTokenId() {
  try {
    const publicClient = createPublicClient({
      chain: CURRENT_CHAIN,
      transport: http(),
    });

    const result: BigInt = (await publicClient.readContract({
      abi: MINTER_ABI,
      address: MINTER_ADDRESS,
      functionName: "tokenId",
      args: [],
    })) as BigInt;
    console.log("Result of tokenId", result.toString());

    return +result.toString();
  } catch (e) {
    console.error(e);
    return null;
  }
}
