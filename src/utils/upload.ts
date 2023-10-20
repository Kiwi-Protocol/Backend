import { IpnsRecord, ProtocolEnum } from "@spheron/storage";
import { spheronClient } from "../constants/storage";
import Jimp from "jimp";
import { rm } from "fs";

export async function uploadToStorage(image: Jimp, ipnsFlag: boolean) {
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

  console.log(result);
  let ipnsRecord: IpnsRecord | null = null;
  if (ipnsFlag) {
    try {
      ipnsRecord = await spheronClient.addBucketIpnsRecord(
        result.bucketId,
        result.uploadId
      );

      console.log(ipnsRecord);
    } catch (err) {
      console.log(err);
    }
  }

  // Delete file now
  rm(filename, () => {});

  const data = {
    ...result,
    url: result.protocolLink + "/" + filename,
    ipns_link: ipnsFlag ? ipnsRecord?.ipnsLink : null,
  };

  return data;
}
