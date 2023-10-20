import { polygon } from "viem/chains";
import Minter from "./Minter.json";
import { Address } from "viem";

require("dotenv/config");

export const WALLET_ADDRESS = "0xe00019DE7B0fBC7B8C7EAD6c0bB470Ec1bA4bA24"; // If Required
export const MINTER_ADDRESS = Minter.address as Address;
export const MINTER_ABI = Minter.abi;
export const CURRENT_CHAIN = polygon;

export const PRIVATE_KEY = process.env.PRIVATE_KEY;
export const SPHERON_TOKEN = process.env.SPHERON_TOKEN;
