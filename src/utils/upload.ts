import { ProtocolEnum } from "@spheron/storage";
import { spheronClient } from "../constants/storage";
import Jimp from "jimp";
import { rm } from "fs";

export async function uploadToStorage(image: Jimp) {
  let currentlyUploaded = 0;

  let randomNumber = Math.round(Math.random() * 1e9);
  let filename = randomNumber + ".png";

  // Temporarily write image to filesystem
  image.write(filename);

  const result = await spheronClient.upload(filename, {
    protocol: ProtocolEnum.IPFS,
    name: filename,
    onUploadInitiated: (uploadId) => {
      console.log(`Upload with id ${uploadId} started...`);
    },
    onChunkUploaded: (uploadedSize, totalSize) => {
      currentlyUploaded += uploadedSize;
      console.log(`Uploaded ${currentlyUploaded} of ${totalSize} Bytes.`);
    },
  });

  // Delete file now
  rm(filename, () => {});

  const data = { ...result, url: result.protocolLink + "/" + filename };

  return data;
}
