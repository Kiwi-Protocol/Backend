import { SpheronClient } from "@spheron/storage";
import { SPHERON_TOKEN } from "../constants";

export const spheronClient = new SpheronClient({
  token: SPHERON_TOKEN || "",
});
